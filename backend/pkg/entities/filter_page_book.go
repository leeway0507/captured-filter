package entities

import (
	"backend/ent"
	"context"
	"errors"

	"github.com/hashicorp/golang-lru/v2/expirable"
)

type PageBook[D comparable] map[int]Page[D]
type Page[D comparable] []D
type FilterResponse[D comparable] struct {
	Data        Page[D] `json:"data"`
	CurrentPage int     `json:"currentPage"`
	LastPage    int     `json:"lastPage"`
	FromCahce   bool    `json:"fromCache"`
	Err         error   `json:"error"`
}
type filterQuery[F, D comparable] func(ctx context.Context, filter F) (Page[D], error)

type FilterPageBook[F comparable, D comparable] struct {
	Session      *ent.Client
	LimitPerPage int
	Cache        *expirable.LRU[F, PageBook[D]]
}

func (fp *FilterPageBook[F, D]) FilterTemplate(ctx context.Context, filter F, page int, filterQuery filterQuery[F, D]) *FilterResponse[D] {

	cachedPageBox, ok := fp.Cache.Get(filter)

	if ok {
		data := cachedPageBox[page]
		return &FilterResponse[D]{
			Data:        data,
			CurrentPage: page,
			LastPage:    len(cachedPageBox),
			FromCahce:   true,
			Err:         nil,
		}
	}

	prod, err := filterQuery(ctx, filter)

	if err != nil {
		return &FilterResponse[D]{
			Data:        nil,
			CurrentPage: page,
			LastPage:    0,
			FromCahce:   false,
			Err:         err,
		}
	}

	newPageBox, err := fp.SplitData(prod)
	if err != nil {
		return &FilterResponse[D]{
			Data:        nil,
			CurrentPage: page,
			LastPage:    0,
			FromCahce:   false,
			Err:         err,
		}
	}

	fp.Cache.Add(filter, newPageBox)

	return &FilterResponse[D]{
		Data:        newPageBox[page],
		CurrentPage: page,
		LastPage:    len(newPageBox),
		FromCahce:   false,
		Err:         nil,
	}
}
func (fp *FilterPageBook[F, D]) FilterQuery(ctx context.Context, filter F) (Page[D], error) {
	err := errors.New("FilterPageBook's FilterQuery Method is not defined")
	return Page[D]{}, err
}

func (fp *FilterPageBook[F, D]) SplitData(data Page[D]) (PageBook[D], error) {

	if fp.LimitPerPage == 0 {
		return PageBook[D]{}, errors.New("FilterPageBook Error : LimitPerPage is 0")
	}

	lenData := len(data)
	q, r := lenData/fp.LimitPerPage, lenData%fp.LimitPerPage

	if r != 0 {
		q++
	}

	PageBook := make(map[int]Page[D])

	for i := 0; i < q; i++ {
		start, end := i*fp.LimitPerPage, (i+1)*fp.LimitPerPage
		if i+1 == q {
			end = len(data)
		}
		PageBook[i+1] = data[start:end]
	}

	return PageBook, nil
}
