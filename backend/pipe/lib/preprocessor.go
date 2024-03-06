package pipe

import (
	"backend/ent"
	"backend/lib/currency"
	"backend/lib/local_file"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"path/filepath"
)

//loadJson => PreProcess =>saveTolocal => save To DB

type RawProduct struct {
	Brand          string `json:"brand,omitempty"`
	ProductName    string `json:"productName,omitempty"`
	ProductImgURL  string `json:"productImgUrl,omitempty"`
	ProductURL     string `json:"productUrl,omitempty"`
	CurrencyCode   string `json:"currencyCode,omitempty"`
	RetailPrice    string `json:"retailPrice,omitempty"`
	SalePrice      string `json:"salePrice,omitempty"`
	KorBrand       string `json:"korBrand,omitempty"`
	KorProductName string `json:"korProductName,omitempty"`
	ProductID      string `json:"productId,omitempty"`
	Gender         string `json:"gender,omitempty"`
	Color          string `json:"color,omitempty"`
	Category       string `json:"category,omitempty"`
	CategorySpec   string `json:"categorySpec,omitempty"`
}

type PreProcessor struct {
	currency currency.CurrencyInterface
}

func NewPreProcessor() *PreProcessor {
	currency := currency.NewCurrency()
	return &PreProcessor{currency}
}

func (p *PreProcessor) Run(storeName string, searchType string, fileName string) {
	data := p.loadFile(storeName, searchType, fileName)
	preprocessedData := p.Preprocess(data)
	p.Save(preprocessedData, storeName, searchType, fileName)
	fmt.Printf("successfully preprocess %s/%s/%s", storeName, searchType, fileName)
}

func (p *PreProcessor) loadFile(storeName string, searchType string, fileName string) *[]RawProduct {
	pipeLinePath := os.Getenv("PIPELINE")
	if pipeLinePath == "" {
		log.Fatal("loadFile Error : Env Not Found")
	}
	path := filepath.Join(pipeLinePath, "raw", storeName, searchType, fileName)
	data, err := local_file.LoadJson[[]RawProduct](path)
	if err != nil {
		log.Fatalf("failed to load data %s", err)
	}
	return data
}

func (p *PreProcessor) Preprocess(rawProducts *[]RawProduct) []ent.Product {
	var data []ent.Product
	for _, rawProd := range *rawProducts {
		d := p.preprocess(rawProd)
		data = append(data, d)
	}
	return data

}

func (p *PreProcessor) preprocess(rawProd RawProduct) ent.Product {
	retailPrice := p.currency.GetPriceInfo(rawProd.RetailPrice).Price
	salePrice := p.currency.GetPriceInfo(rawProd.SalePrice).Price

	return ent.Product{
		Brand:          rawProd.Brand,
		ProductName:    rawProd.ProductName,
		ProductImgURL:  rawProd.ProductImgURL,
		ProductURL:     rawProd.ProductURL,
		CurrencyCode:   rawProd.CurrencyCode,
		RetailPrice:    retailPrice,
		SalePrice:      salePrice,
		KorBrand:       rawProd.KorBrand,
		KorProductName: rawProd.KorProductName,
		ProductID:      rawProd.ProductID,
		Gender:         rawProd.Gender,
		Color:          rawProd.Color,
		Category:       rawProd.Category,
		CategorySpec:   rawProd.CategorySpec,
	}
}

func (p *PreProcessor) Save(prod []ent.Product, storeName string, searchType string, fileName string) {
	b, err := json.Marshal(prod)
	if err != nil {
		log.Fatalf("Save Error : %s", err)
	}
	pipeLinePath := os.Getenv("PIPELINE")
	if pipeLinePath == "" {
		log.Fatalf("Save Error : Env Not Found")
	}
	filePath := filepath.Join(pipeLinePath, "preprocess", storeName, searchType, fileName)
	err = local_file.SaveFile(b, filePath)
	if err != nil {
		log.Fatalf("Save Error : %s", err)

	}
}
