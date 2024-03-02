package pipe

import (
	"backend/db"
	"backend/ent"
	"backend/lib/local_file"
	"backend/pkg/product"
	"context"
	"fmt"
	"log"
	"os"
	"path/filepath"
)

func NewUploader() *Uploader {
	uploader := &DB{Session: db.Session()}
	return &Uploader{uploader}
}

type Uploader struct {
	uploader ProductUploader
}

func (u *Uploader) Run(storeName string, searchType string, fileName string) {
	data := u.loadFile(storeName, searchType, fileName)
	u.Upload(storeName, data)
	fmt.Printf("successfully preprocess %s/%s/%s", storeName, searchType, fileName)
}

func (p *Uploader) loadFile(storeName string, searchType string, fileName string) *[]ent.Product {
	pipeLinePath := os.Getenv("PIPELINE")
	if pipeLinePath == "" {
		log.Fatal("loadFile Error : Env Not Found")
	}
	path := filepath.Join(pipeLinePath, "preprocess", storeName, searchType, fileName)
	data, err := local_file.LoadJson[[]ent.Product](path)
	if err != nil {
		log.Fatalf("failed to load data %s", err)
	}
	return data
}

func (p *Uploader) Upload(storeName string, rawProducts *[]ent.Product) {
	err := p.uploader.Upload(storeName, rawProducts)
	if err != nil {
		log.Fatal(err)
	}

}

type ProductUploader interface {
	Upload(storeName string, prods *[]ent.Product) error
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
