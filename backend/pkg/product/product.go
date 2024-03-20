package product

import (
	"backend/db"
	"backend/ent"
	"backend/ent/product"
	"backend/pkg/entities"
	"context"
	"time"
)

type ProductCamel struct {
	ID             int       `json:"id,omitempty"`
	StoreName      string    `json:"storeName,omitempty"`
	Brand          string    `json:"brand,omitempty"`
	ProductName    string    `json:"productName,omitempty"`
	ProductImgURL  string    `json:"productImgUrl,omitempty"`
	ProductURL     string    `json:"productUrl,omitempty"`
	CurrencyCode   string    `json:"currencyCode,omitempty"`
	RetailPrice    float64   `json:"retailPrice,omitempty"`
	SalePrice      float64   `json:"salePrice,omitempty"`
	KorBrand       string    `json:"korBrand,omitempty"`
	KorProductName string    `json:"korProductName,omitempty"`
	ProductID      string    `json:"productId,omitempty"`
	Gender         string    `json:"gender,omitempty"`
	Color          string    `json:"color,omitempty"`
	Category       string    `json:"category,omitempty"`
	CategorySpec   string    `json:"categorySpec,omitempty"`
	SoldOut        bool      `json:"soldOut,omitempty"`
	UpdatedAt      time.Time `json:"updatedAt,omitempty"`
}
type ProductPage struct {
	Page   int              `json:"page"`
	Filter ProductFilterReq `json:"filter"`
}
type ProductFilterReq struct {
	StoreName *[]string `json:"storeInfo"`
	Brand     *[]string `json:"productInfo_product_id"`
	Sale      bool      `json:"sale"`
}

var (
	productFilter = NewProductFilterPageBook()
)

func GetProducts(session *ent.Client, p *ProductPage, limit int) *entities.FilterResponse[*ent.Product] {
	productFilter.Session = session
	productFilter.LimitPerPage = limit

	// fmt.Println("GoLang GetProducts")
	// fmt.Printf("%+v", p)
	if p.Page == 0 {
		p.Page = 1
	}
	ctx := context.Background()
	return productFilter.Filter(ctx, p.Filter, p.Page)

}

func GetProduct(ctx context.Context, session *ent.Client, id int,
) (*ent.Product, error) {
	return session.Product.Query().WithStore().
		Where(product.IDEQ(id)).First(ctx)
}

func CreateProduct(ctx context.Context, session *ent.Client, store_name string, productData *ent.Product) error {
	createProductRow := db.CreateProductRow(session, ctx, store_name, productData)

	err := createProductRow.Exec(ctx)

	if err != nil {
		return err
	}
	return nil
}
