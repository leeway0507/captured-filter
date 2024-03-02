package product

import (
	"backend/db"
	"backend/ent"
	"backend/ent/product"
	"context"
)

func GetProducts(ctx context.Context, session *ent.Client,
) ([]*ent.Product, error) {
	return session.Product.Query().All(ctx)
}

func GetProduct(ctx context.Context, session *ent.Client, id int,
) (*ent.Product, error) {
	return session.Product.Query().WithStore().
		Where(product.IDEQ(id)).First(ctx)
}

func CreateProduct(ctx context.Context, session *ent.Client, store_name string, productData *ent.Product) error {
	createProductRow := db.CreateProductRow(session, ctx, store_name, productData)

	_, err := createProductRow.Save(ctx)

	if err != nil {
		return err
	}
	return nil
}
