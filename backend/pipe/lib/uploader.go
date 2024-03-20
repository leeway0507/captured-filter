package pipe

import (
	"backend/db"
	"backend/ent"
	entProduct "backend/ent/product"
	customslice "backend/lib/custom_slice"
	"backend/lib/local_file"
	"backend/pkg/product"
	"context"
	"fmt"
	"log"
	"os"
	"path/filepath"
)

func NewUploader() *Uploader {
	store := &DB{Session: db.Session()}
	return &Uploader{store}
}

type Uploader struct {
	store ProductStore
}

func (u *Uploader) Run(storeName string, searchType string, fileName string) {
	data := u.loadFile(storeName, searchType, fileName)
	brands := customslice.UniqueSliceElements[ent.Product, string](*data, u.Selector)
	u.SetSoldOut(brands, storeName)
	u.Upload(storeName, data)
	fmt.Printf("successfully Upload %s/%s/%s", storeName, searchType, fileName)
}

func (p *Uploader) loadFile(storeName string, searchType string, fileName string) *[]ent.Product {
	pipeLinePath := os.Getenv("PIPELINE")
	if pipeLinePath == "" {
		log.Fatal("loadFile Error : Env Not Found")
	}
	path := filepath.Join(pipeLinePath, "data", "preprocess", storeName, searchType, fileName)
	data, err := local_file.LoadJson[[]ent.Product](path)
	if err != nil {
		log.Fatalf("failed to load data %s", err)
	}
	return data
}

func (p *Uploader) SetSoldOut(brandName []string, storeName string) {
	err := p.store.SetSoldOut(brandName, storeName)
	if err != nil {
		log.Fatal(err)
	}
}

func (p *Uploader) Upload(storeName string, rawProducts *[]ent.Product) {
	err := p.store.Upload(storeName, rawProducts)
	if err != nil {
		log.Fatal(err)
	}
}
func (p *Uploader) Selector(prod ent.Product) string {
	return prod.Brand
}

type ProductStore interface {
	Upload(storeName string, prods *[]ent.Product) error
	SetSoldOut(brandName []string, storeName string) error
}

type DB struct {
	Session *ent.Client
}

func (db *DB) Upload(storeName string, prods *[]ent.Product) error {
	ctx := context.Background()
	for _, prod := range *prods {
		err := product.CreateProduct(ctx, db.Session, storeName, &prod)
		if err != nil {
			return err
		}
	}
	return nil
}

func (db *DB) SetSoldOut(brandName []string, storeName string) error {
	ctx := context.Background()
	err := db.Session.Product.Update().
		Where(entProduct.BrandIn(brandName...), entProduct.StoreName(storeName)).
		SetSoldOut(true).
		Exec(ctx)
	if err != nil {
		return err
	}
	return nil
}
