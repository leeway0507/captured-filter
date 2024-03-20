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
	IsSale         bool   `json:"isSale,omitempty"`
	MadeIn         string `json:"made_in,omitempty"`
	KorBrand       string `json:"korBrand,omitempty"`
	KorProductName string `json:"korProductName,omitempty"`
	ProductID      string `json:"productId,omitempty"`
	Gender         string `json:"gender,omitempty"`
	Color          string `json:"color,omitempty"`
	Category       string `json:"category,omitempty"`
	CategorySpec   string `json:"categorySpec,omitempty"`
}

type PreProcessor struct {
	currency     currency.CurrencyInterface
	korBrandMeta *map[string]string
}

func NewPreProcessor() *PreProcessor {
	currency := currency.NewCurrency()
	korBrandMeta := LoadFile[map[string]string]("meta/brand.json")
	return &PreProcessor{currency, korBrandMeta}
}

func (p *PreProcessor) Run(storeName string, searchType string, fileName string) {
	path := filepath.Join("data", "raw", storeName, searchType, fileName)
	data := LoadFile[[]RawProduct](path)
	preprocessedData := p.Preprocess(data)
	p.Save(preprocessedData, storeName, searchType, fileName)
	fmt.Printf("successfully preprocess %s/%s/%s", storeName, searchType, fileName)
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
	korBrand := p.MapKorBrand(rawProd.Brand)

	return ent.Product{
		Brand:          rawProd.Brand,
		ProductName:    rawProd.ProductName,
		ProductImgURL:  rawProd.ProductImgURL,
		ProductURL:     rawProd.ProductURL,
		CurrencyCode:   rawProd.CurrencyCode,
		RetailPrice:    retailPrice,
		SalePrice:      salePrice,
		IsSale:         rawProd.IsSale,
		KorBrand:       korBrand,
		KorProductName: rawProd.KorProductName,
		ProductID:      rawProd.ProductID,
		Gender:         rawProd.Gender,
		Color:          rawProd.Color,
		Category:       rawProd.Category,
		CategorySpec:   rawProd.CategorySpec,
		MadeIn:         rawProd.MadeIn,
	}
}

func (p *PreProcessor) MapKorBrand(brandName string) string {
	korName, found := (*p.korBrandMeta)[brandName]
	if !found {
		log.Fatalf("%s is not found in brand meta", brandName)
	}
	return korName

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
	filePath := filepath.Join(pipeLinePath, "data", "preprocess", storeName, searchType, fileName)
	err = local_file.SaveFile(b, filePath)
	if err != nil {
		log.Fatalf("Save Error : %s", err)

	}
}

func LoadFile[T any](filePath string) *T {
	pipeLinePath := os.Getenv("PIPELINE")
	if pipeLinePath == "" {
		log.Fatal("loadFile Error : Env Not Found")
	}
	path := filepath.Join(pipeLinePath, filePath)
	data, err := local_file.LoadJson[T](path)
	if err != nil {
		log.Fatalf("failed to load data %s", err)
	}
	return data
}
