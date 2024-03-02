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

func LoadStoreDataForForegnKey(t *testing.T, session *ent.Client, ctx context.Context) {
	// 순환참조 방지를 위해 그대로 작성
	envset.Load(".env.dev")
	mockPath := os.Getenv("MOCK_DATA")
	// store row 추가 foreign key 생성 목적
	var filePath = filepath.Join(mockPath, "db", "store.json")
	storeData, err := local_file.LoadJson[[]ent.Store](filePath)
	if err != nil {
		t.Fatal(err)
	}
	createStoreRow := CreateStoreRow(session, ctx, &(*storeData)[0])

	createStoreRow.SaveX(ctx)

}

func CreateStoreRow(session *ent.Client, ctx context.Context, d *ent.Store) *ent.StoreCreate {
	return session.Store.Create().
		SetID(d.ID).
		SetCountry(d.Country).
		SetBrokerFee(d.BrokerFee).
		SetCurrency(d.Currency).
		SetDdp(d.Ddp).
		SetDeliveryAgency(d.DeliveryAgency).
		SetDomesticFreeShippingFee(d.DomesticFreeShippingFee).
		SetDomesticShippingFee(d.DomesticShippingFee).
		SetIntlFreeShippingFee(d.IntlFreeShippingFee).
		SetShippingFeeCumulation(d.ShippingFeeCumulation).
		SetIntlShippingFee(d.IntlShippingFee).
		SetTaxReduction(d.TaxReduction).
		SetURL(d.URL)
}
