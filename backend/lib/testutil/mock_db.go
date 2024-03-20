package testutil

import (
	"backend/ent"
	"backend/ent/enttest"
	"backend/lib/envset"
	"backend/lib/local_file"
	"context"
	"log"
	"os"
	"path/filepath"
	"testing"

	_ "github.com/mattn/go-sqlite3"
)

func MockDB(t *testing.T) *ent.Client {
	session := enttest.Open(t, "sqlite3", "file:ent?mode=memory&_fk=1")
	ctx := context.Background()
	err := session.Schema.Create(ctx)

	if err != nil {
		log.Fatal("Failed to session Schema Create")
	}
	return session
}

func LoadStoreDataForForeignKey(t *testing.T, session *ent.Client, ctx context.Context) {
	// 순환참조 방지를 위해 그대로 작성
	envset.Load(".env.dev")
	mockPath := os.Getenv("MOCK_DATA")
	// store row 추가 foreign key 생성 목적
	var filePath = filepath.Join(mockPath, "db", "store.json")
	storeData, err := local_file.LoadJson[[]ent.Store](filePath)
	if err != nil {
		t.Fatal(err)
	}

	for _, v := range *storeData {
		createStoreRow := CreateMockStoreRow(session, ctx, &v)
		err := createStoreRow.Exec(ctx)
		if err != nil {
			t.Fatal(err)
		}
	}

	if err != nil {
		t.Fatalf("failed save data => LoadStoreDataForForeignKey : %s", err)
	}

}

func CreateMockStoreRow(session *ent.Client, ctx context.Context, d *ent.Store) *ent.StoreCreate {
	return session.Store.Create().
		SetID(d.ID).
		SetKorID(d.KorID).
		SetCountry(d.Country).
		SetBrokerFee(d.BrokerFee).
		SetCurrency(d.Currency).
		SetDdp(d.Ddp).
		SetDeliveryAgency(d.DeliveryAgency).
		SetDomesticFreeShippingMin(d.DomesticFreeShippingMin).
		SetDomesticShippingFee(d.DomesticShippingFee).
		SetIntlFreeShippingMin(d.IntlFreeShippingMin).
		SetShippingFeeCumulation(d.ShippingFeeCumulation).
		SetIntlShippingFee(d.IntlShippingFee).
		SetTaxReduction(d.TaxReduction).
		SetTaxReductionManually(d.TaxReductionManually).
		SetURL(d.URL)
}

func LoadMockProductData(t *testing.T, session *ent.Client, ctx context.Context) {
	// 순환참조 방지를 위해 그대로 작성
	envset.Load(".env.dev")
	mockPath := os.Getenv("MOCK_DATA")
	// store row 추가 foreign key 생성 목적
	var filePath = filepath.Join(mockPath, "db", "product_50.json")
	productData, err := local_file.LoadJson[[]ent.Product](filePath)
	if err != nil {
		t.Fatal(err)
	}

	for _, v := range *productData {
		upsertRow := CreateMockProductRow(session, ctx, &v)
		err := upsertRow.Exec(ctx)
		if err != nil {
			t.Fatal(err)
		}
	}

}
func CreateMockProductRow(session *ent.Client, ctx context.Context, d *ent.Product) *ent.ProductUpsertOne {

	return session.Product.Create().
		SetStoreName(d.StoreName).
		SetBrand(d.Brand).
		SetProductName(d.ProductName).
		SetProductImgURL(d.ProductImgURL).
		SetProductURL(d.ProductURL).
		SetCurrencyCode(d.CurrencyCode).
		SetRetailPrice(d.RetailPrice).
		SetSalePrice(d.SalePrice).
		SetIsSale(d.IsSale).
		SetKorBrand(d.KorBrand).
		SetKorProductName(d.KorProductName).
		SetProductID(d.ProductID).
		SetGender(d.Gender).
		SetColor(d.Color).
		SetCategory(d.Category).
		SetCategorySpec(d.CategorySpec).
		SetSoldOut(d.SoldOut).
		OnConflict().
		UpdateNewValues()
}
