package entities

import (
	"context"
	"database/sql"
	"errors"

	"github.com/hashicorp/golang-lru/v2/expirable"
)

type Book[D comparable] map[int]Page[D]
type Page[D comparable] []D
type FilterBookResponse[D comparable] struct {
	Data        Page[D] `json:"data"`
	CurrentPage int     `json:"currentPage"`
	LastPage    int     `json:"lastPage"`
	FromCahce   bool    `json:"fromCache"`
	Err         error   `json:"error"`
}
type filterQuery[F, D comparable] func(ctx context.Context, filter F) (Page[D], error)

type FilterBook[F comparable, D comparable] struct {
	Session      *sql.DB
	LimitPerPage int
	Cache        *expirable.LRU[F, Book[D]]
}

func (fp *FilterBook[F, D]) FilterTemplate(ctx context.Context, filter F, page int, filterQuery filterQuery[F, D]) *FilterBookResponse[D] {

	cachedPageBox, ok := fp.Cache.Get(filter)

	if ok {
		data := cachedPageBox[page]
		return &FilterBookResponse[D]{
			Data:        data,
			CurrentPage: page,
			LastPage:    len(cachedPageBox),
			FromCahce:   true,
			Err:         nil,
		}
	}

	prod, err := filterQuery(ctx, filter)

	if err != nil {
		return &FilterBookResponse[D]{
			Data:        nil,
			CurrentPage: page,
			LastPage:    0,
			FromCahce:   false,
			Err:         err,
		}
	}

	newPageBox, err := fp.SplitData(prod)
	if err != nil {
		return &FilterBookResponse[D]{
			Data:        nil,
			CurrentPage: page,
			LastPage:    0,
			FromCahce:   false,
			Err:         err,
		}
	}

	fp.Cache.Add(filter, newPageBox)

	return &FilterBookResponse[D]{
		Data:        newPageBox[page],
		CurrentPage: page,
		LastPage:    len(newPageBox),
		FromCahce:   false,
		Err:         nil,
	}
}
func (fp *FilterBook[F, D]) FilterQuery(ctx context.Context, filter F) (Page[D], error) {
	err := errors.New("FilterBook's FilterQuery Method is not defined")
	return Page[D]{}, err
}

func (fp *FilterBook[F, D]) SplitData(data Page[D]) (Book[D], error) {

	if fp.LimitPerPage == 0 {
		return Book[D]{}, errors.New("FilterBook Error : LimitPerPage is 0")
	}

	lenData := len(data)
	q, r := lenData/fp.LimitPerPage, lenData%fp.LimitPerPage

	if r != 0 {
		q++
	}

	Book := make(map[int]Page[D])

	for i := 0; i < q; i++ {
		start, end := i*fp.LimitPerPage, (i+1)*fp.LimitPerPage
		if i+1 == q {
			end = len(data)
		}
		Book[i+1] = data[start:end]
	}

	return Book, nil
}
