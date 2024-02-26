package db

import (
	"backend/ent"
	"context"
)

func CreateProductRow(session *ent.Client, ctx context.Context, d *ent.Product) *ent.ProductCreate {
	return session.Product.Create().
		SetStoreID(d.StoreID).
		SetBrand(d.Brand).
		SetProductName(d.ProductName).
		SetProductImgURL(d.ProductImgURL).
		SetProductURL(d.ProductURL).
		SetPriceCurrency(d.PriceCurrency).
		SetInitPrice(d.InitPrice).
		SetLastPrice(d.LastPrice).
		SetKorBrand(d.KorBrand).
		SetKorProductName(d.KorProductName).
		SetProductID(d.ProductID).
		SetGender(d.Gender).
		SetColor(d.Color).
		SetCategory(d.Category).
		SetCategorySpec(d.CategorySpec).
		SetSoldOut(d.SoldOut)
}

func CreateDelveryAgencyRow(session *ent.Client, ctx context.Context, d *ent.DeliveryAgency) *ent.DeliveryAgencyCreate {
	return session.DeliveryAgency.Create().
		SetCountry(d.Country).
		SetVATReductionRate(d.VATReductionRate).
		SetShippingFee(d.ShippingFee).
		SetUpdatedAt(d.UpdatedAt)
}

func CreateStoreRow(session *ent.Client, ctx context.Context, d *ent.Store) *ent.StoreCreate {
	return session.Store.Create().
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
		SetStoreName(d.StoreName).
		SetTaxReduction(d.TaxReduction).
		SetURL(d.URL).
		SetUpdatedAt(d.UpdatedAt)
}
