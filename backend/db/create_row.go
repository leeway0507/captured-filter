package db

import (
	"backend/ent"
	"context"
)

func CreateProductRow(session *ent.Client, ctx context.Context, store_name string, d *ent.Product) *ent.ProductUpsertOne {
	return session.Product.Create().
		SetStoreID(store_name).
		SetBrand(d.Brand).
		SetProductName(d.ProductName).
		SetProductImgURL(d.ProductImgURL).
		SetProductURL(d.ProductURL).
		SetCurrencyCode(d.CurrencyCode).
		SetRetailPrice(d.RetailPrice).
		SetSalePrice(d.SalePrice).
		SetIsSale(d.IsSale).
		SetMadeIn(d.MadeIn).
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

func CreateDelveryAgencyRow(session *ent.Client, ctx context.Context, d *ent.DeliveryAgency) *ent.DeliveryAgencyUpsertOne {
	return session.DeliveryAgency.Create().
		SetCountry(d.Country).
		SetVATReductionRate(d.VATReductionRate).
		SetShippingFee(d.ShippingFee).
		OnConflict().
		UpdateNewValues()
}

func CreateStoreRow(session *ent.Client, ctx context.Context, d *ent.Store) *ent.StoreUpsertOne {
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
		SetStoreURL(d.StoreURL).
		OnConflict().
		UpdateNewValues()
}
