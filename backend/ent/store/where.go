// Code generated by ent, DO NOT EDIT.

package store

import (
	"backend/ent/predicate"
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
)

// ID filters vertices based on their ID field.
func ID(id string) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldID, id))
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id string) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldID, id))
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id string) predicate.Store {
	return predicate.Store(sql.FieldNEQ(FieldID, id))
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...string) predicate.Store {
	return predicate.Store(sql.FieldIn(FieldID, ids...))
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...string) predicate.Store {
	return predicate.Store(sql.FieldNotIn(FieldID, ids...))
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id string) predicate.Store {
	return predicate.Store(sql.FieldGT(FieldID, id))
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id string) predicate.Store {
	return predicate.Store(sql.FieldGTE(FieldID, id))
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id string) predicate.Store {
	return predicate.Store(sql.FieldLT(FieldID, id))
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id string) predicate.Store {
	return predicate.Store(sql.FieldLTE(FieldID, id))
}

// IDEqualFold applies the EqualFold predicate on the ID field.
func IDEqualFold(id string) predicate.Store {
	return predicate.Store(sql.FieldEqualFold(FieldID, id))
}

// IDContainsFold applies the ContainsFold predicate on the ID field.
func IDContainsFold(id string) predicate.Store {
	return predicate.Store(sql.FieldContainsFold(FieldID, id))
}

// KorID applies equality check predicate on the "kor_id" field. It's identical to KorIDEQ.
func KorID(v string) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldKorID, v))
}

// URL applies equality check predicate on the "url" field. It's identical to URLEQ.
func URL(v string) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldURL, v))
}

// Country applies equality check predicate on the "country" field. It's identical to CountryEQ.
func Country(v string) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldCountry, v))
}

// Currency applies equality check predicate on the "currency" field. It's identical to CurrencyEQ.
func Currency(v string) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldCurrency, v))
}

// TaxReduction applies equality check predicate on the "tax_reduction" field. It's identical to TaxReductionEQ.
func TaxReduction(v float64) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldTaxReduction, v))
}

// TaxReductionManually applies equality check predicate on the "tax_reduction_manually" field. It's identical to TaxReductionManuallyEQ.
func TaxReductionManually(v bool) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldTaxReductionManually, v))
}

// IntlFreeShippingMin applies equality check predicate on the "intl_free_shipping_min" field. It's identical to IntlFreeShippingMinEQ.
func IntlFreeShippingMin(v int) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldIntlFreeShippingMin, v))
}

// DomesticShippingFee applies equality check predicate on the "domestic_shipping_fee" field. It's identical to DomesticShippingFeeEQ.
func DomesticShippingFee(v float64) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldDomesticShippingFee, v))
}

// DomesticFreeShippingMin applies equality check predicate on the "domestic_free_shipping_min" field. It's identical to DomesticFreeShippingMinEQ.
func DomesticFreeShippingMin(v float64) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldDomesticFreeShippingMin, v))
}

// ShippingFeeCumulation applies equality check predicate on the "shipping_fee_cumulation" field. It's identical to ShippingFeeCumulationEQ.
func ShippingFeeCumulation(v bool) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldShippingFeeCumulation, v))
}

// DeliveryAgency applies equality check predicate on the "delivery_agency" field. It's identical to DeliveryAgencyEQ.
func DeliveryAgency(v string) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldDeliveryAgency, v))
}

// BrokerFee applies equality check predicate on the "broker_fee" field. It's identical to BrokerFeeEQ.
func BrokerFee(v bool) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldBrokerFee, v))
}

// Ddp applies equality check predicate on the "ddp" field. It's identical to DdpEQ.
func Ddp(v bool) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldDdp, v))
}

// UpdatedAt applies equality check predicate on the "updated_at" field. It's identical to UpdatedAtEQ.
func UpdatedAt(v time.Time) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldUpdatedAt, v))
}

// KorIDEQ applies the EQ predicate on the "kor_id" field.
func KorIDEQ(v string) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldKorID, v))
}

// KorIDNEQ applies the NEQ predicate on the "kor_id" field.
func KorIDNEQ(v string) predicate.Store {
	return predicate.Store(sql.FieldNEQ(FieldKorID, v))
}

// KorIDIn applies the In predicate on the "kor_id" field.
func KorIDIn(vs ...string) predicate.Store {
	return predicate.Store(sql.FieldIn(FieldKorID, vs...))
}

// KorIDNotIn applies the NotIn predicate on the "kor_id" field.
func KorIDNotIn(vs ...string) predicate.Store {
	return predicate.Store(sql.FieldNotIn(FieldKorID, vs...))
}

// KorIDGT applies the GT predicate on the "kor_id" field.
func KorIDGT(v string) predicate.Store {
	return predicate.Store(sql.FieldGT(FieldKorID, v))
}

// KorIDGTE applies the GTE predicate on the "kor_id" field.
func KorIDGTE(v string) predicate.Store {
	return predicate.Store(sql.FieldGTE(FieldKorID, v))
}

// KorIDLT applies the LT predicate on the "kor_id" field.
func KorIDLT(v string) predicate.Store {
	return predicate.Store(sql.FieldLT(FieldKorID, v))
}

// KorIDLTE applies the LTE predicate on the "kor_id" field.
func KorIDLTE(v string) predicate.Store {
	return predicate.Store(sql.FieldLTE(FieldKorID, v))
}

// KorIDContains applies the Contains predicate on the "kor_id" field.
func KorIDContains(v string) predicate.Store {
	return predicate.Store(sql.FieldContains(FieldKorID, v))
}

// KorIDHasPrefix applies the HasPrefix predicate on the "kor_id" field.
func KorIDHasPrefix(v string) predicate.Store {
	return predicate.Store(sql.FieldHasPrefix(FieldKorID, v))
}

// KorIDHasSuffix applies the HasSuffix predicate on the "kor_id" field.
func KorIDHasSuffix(v string) predicate.Store {
	return predicate.Store(sql.FieldHasSuffix(FieldKorID, v))
}

// KorIDEqualFold applies the EqualFold predicate on the "kor_id" field.
func KorIDEqualFold(v string) predicate.Store {
	return predicate.Store(sql.FieldEqualFold(FieldKorID, v))
}

// KorIDContainsFold applies the ContainsFold predicate on the "kor_id" field.
func KorIDContainsFold(v string) predicate.Store {
	return predicate.Store(sql.FieldContainsFold(FieldKorID, v))
}

// URLEQ applies the EQ predicate on the "url" field.
func URLEQ(v string) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldURL, v))
}

// URLNEQ applies the NEQ predicate on the "url" field.
func URLNEQ(v string) predicate.Store {
	return predicate.Store(sql.FieldNEQ(FieldURL, v))
}

// URLIn applies the In predicate on the "url" field.
func URLIn(vs ...string) predicate.Store {
	return predicate.Store(sql.FieldIn(FieldURL, vs...))
}

// URLNotIn applies the NotIn predicate on the "url" field.
func URLNotIn(vs ...string) predicate.Store {
	return predicate.Store(sql.FieldNotIn(FieldURL, vs...))
}

// URLGT applies the GT predicate on the "url" field.
func URLGT(v string) predicate.Store {
	return predicate.Store(sql.FieldGT(FieldURL, v))
}

// URLGTE applies the GTE predicate on the "url" field.
func URLGTE(v string) predicate.Store {
	return predicate.Store(sql.FieldGTE(FieldURL, v))
}

// URLLT applies the LT predicate on the "url" field.
func URLLT(v string) predicate.Store {
	return predicate.Store(sql.FieldLT(FieldURL, v))
}

// URLLTE applies the LTE predicate on the "url" field.
func URLLTE(v string) predicate.Store {
	return predicate.Store(sql.FieldLTE(FieldURL, v))
}

// URLContains applies the Contains predicate on the "url" field.
func URLContains(v string) predicate.Store {
	return predicate.Store(sql.FieldContains(FieldURL, v))
}

// URLHasPrefix applies the HasPrefix predicate on the "url" field.
func URLHasPrefix(v string) predicate.Store {
	return predicate.Store(sql.FieldHasPrefix(FieldURL, v))
}

// URLHasSuffix applies the HasSuffix predicate on the "url" field.
func URLHasSuffix(v string) predicate.Store {
	return predicate.Store(sql.FieldHasSuffix(FieldURL, v))
}

// URLEqualFold applies the EqualFold predicate on the "url" field.
func URLEqualFold(v string) predicate.Store {
	return predicate.Store(sql.FieldEqualFold(FieldURL, v))
}

// URLContainsFold applies the ContainsFold predicate on the "url" field.
func URLContainsFold(v string) predicate.Store {
	return predicate.Store(sql.FieldContainsFold(FieldURL, v))
}

// CountryEQ applies the EQ predicate on the "country" field.
func CountryEQ(v string) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldCountry, v))
}

// CountryNEQ applies the NEQ predicate on the "country" field.
func CountryNEQ(v string) predicate.Store {
	return predicate.Store(sql.FieldNEQ(FieldCountry, v))
}

// CountryIn applies the In predicate on the "country" field.
func CountryIn(vs ...string) predicate.Store {
	return predicate.Store(sql.FieldIn(FieldCountry, vs...))
}

// CountryNotIn applies the NotIn predicate on the "country" field.
func CountryNotIn(vs ...string) predicate.Store {
	return predicate.Store(sql.FieldNotIn(FieldCountry, vs...))
}

// CountryGT applies the GT predicate on the "country" field.
func CountryGT(v string) predicate.Store {
	return predicate.Store(sql.FieldGT(FieldCountry, v))
}

// CountryGTE applies the GTE predicate on the "country" field.
func CountryGTE(v string) predicate.Store {
	return predicate.Store(sql.FieldGTE(FieldCountry, v))
}

// CountryLT applies the LT predicate on the "country" field.
func CountryLT(v string) predicate.Store {
	return predicate.Store(sql.FieldLT(FieldCountry, v))
}

// CountryLTE applies the LTE predicate on the "country" field.
func CountryLTE(v string) predicate.Store {
	return predicate.Store(sql.FieldLTE(FieldCountry, v))
}

// CountryContains applies the Contains predicate on the "country" field.
func CountryContains(v string) predicate.Store {
	return predicate.Store(sql.FieldContains(FieldCountry, v))
}

// CountryHasPrefix applies the HasPrefix predicate on the "country" field.
func CountryHasPrefix(v string) predicate.Store {
	return predicate.Store(sql.FieldHasPrefix(FieldCountry, v))
}

// CountryHasSuffix applies the HasSuffix predicate on the "country" field.
func CountryHasSuffix(v string) predicate.Store {
	return predicate.Store(sql.FieldHasSuffix(FieldCountry, v))
}

// CountryEqualFold applies the EqualFold predicate on the "country" field.
func CountryEqualFold(v string) predicate.Store {
	return predicate.Store(sql.FieldEqualFold(FieldCountry, v))
}

// CountryContainsFold applies the ContainsFold predicate on the "country" field.
func CountryContainsFold(v string) predicate.Store {
	return predicate.Store(sql.FieldContainsFold(FieldCountry, v))
}

// CurrencyEQ applies the EQ predicate on the "currency" field.
func CurrencyEQ(v string) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldCurrency, v))
}

// CurrencyNEQ applies the NEQ predicate on the "currency" field.
func CurrencyNEQ(v string) predicate.Store {
	return predicate.Store(sql.FieldNEQ(FieldCurrency, v))
}

// CurrencyIn applies the In predicate on the "currency" field.
func CurrencyIn(vs ...string) predicate.Store {
	return predicate.Store(sql.FieldIn(FieldCurrency, vs...))
}

// CurrencyNotIn applies the NotIn predicate on the "currency" field.
func CurrencyNotIn(vs ...string) predicate.Store {
	return predicate.Store(sql.FieldNotIn(FieldCurrency, vs...))
}

// CurrencyGT applies the GT predicate on the "currency" field.
func CurrencyGT(v string) predicate.Store {
	return predicate.Store(sql.FieldGT(FieldCurrency, v))
}

// CurrencyGTE applies the GTE predicate on the "currency" field.
func CurrencyGTE(v string) predicate.Store {
	return predicate.Store(sql.FieldGTE(FieldCurrency, v))
}

// CurrencyLT applies the LT predicate on the "currency" field.
func CurrencyLT(v string) predicate.Store {
	return predicate.Store(sql.FieldLT(FieldCurrency, v))
}

// CurrencyLTE applies the LTE predicate on the "currency" field.
func CurrencyLTE(v string) predicate.Store {
	return predicate.Store(sql.FieldLTE(FieldCurrency, v))
}

// CurrencyContains applies the Contains predicate on the "currency" field.
func CurrencyContains(v string) predicate.Store {
	return predicate.Store(sql.FieldContains(FieldCurrency, v))
}

// CurrencyHasPrefix applies the HasPrefix predicate on the "currency" field.
func CurrencyHasPrefix(v string) predicate.Store {
	return predicate.Store(sql.FieldHasPrefix(FieldCurrency, v))
}

// CurrencyHasSuffix applies the HasSuffix predicate on the "currency" field.
func CurrencyHasSuffix(v string) predicate.Store {
	return predicate.Store(sql.FieldHasSuffix(FieldCurrency, v))
}

// CurrencyEqualFold applies the EqualFold predicate on the "currency" field.
func CurrencyEqualFold(v string) predicate.Store {
	return predicate.Store(sql.FieldEqualFold(FieldCurrency, v))
}

// CurrencyContainsFold applies the ContainsFold predicate on the "currency" field.
func CurrencyContainsFold(v string) predicate.Store {
	return predicate.Store(sql.FieldContainsFold(FieldCurrency, v))
}

// TaxReductionEQ applies the EQ predicate on the "tax_reduction" field.
func TaxReductionEQ(v float64) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldTaxReduction, v))
}

// TaxReductionNEQ applies the NEQ predicate on the "tax_reduction" field.
func TaxReductionNEQ(v float64) predicate.Store {
	return predicate.Store(sql.FieldNEQ(FieldTaxReduction, v))
}

// TaxReductionIn applies the In predicate on the "tax_reduction" field.
func TaxReductionIn(vs ...float64) predicate.Store {
	return predicate.Store(sql.FieldIn(FieldTaxReduction, vs...))
}

// TaxReductionNotIn applies the NotIn predicate on the "tax_reduction" field.
func TaxReductionNotIn(vs ...float64) predicate.Store {
	return predicate.Store(sql.FieldNotIn(FieldTaxReduction, vs...))
}

// TaxReductionGT applies the GT predicate on the "tax_reduction" field.
func TaxReductionGT(v float64) predicate.Store {
	return predicate.Store(sql.FieldGT(FieldTaxReduction, v))
}

// TaxReductionGTE applies the GTE predicate on the "tax_reduction" field.
func TaxReductionGTE(v float64) predicate.Store {
	return predicate.Store(sql.FieldGTE(FieldTaxReduction, v))
}

// TaxReductionLT applies the LT predicate on the "tax_reduction" field.
func TaxReductionLT(v float64) predicate.Store {
	return predicate.Store(sql.FieldLT(FieldTaxReduction, v))
}

// TaxReductionLTE applies the LTE predicate on the "tax_reduction" field.
func TaxReductionLTE(v float64) predicate.Store {
	return predicate.Store(sql.FieldLTE(FieldTaxReduction, v))
}

// TaxReductionManuallyEQ applies the EQ predicate on the "tax_reduction_manually" field.
func TaxReductionManuallyEQ(v bool) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldTaxReductionManually, v))
}

// TaxReductionManuallyNEQ applies the NEQ predicate on the "tax_reduction_manually" field.
func TaxReductionManuallyNEQ(v bool) predicate.Store {
	return predicate.Store(sql.FieldNEQ(FieldTaxReductionManually, v))
}

// IntlFreeShippingMinEQ applies the EQ predicate on the "intl_free_shipping_min" field.
func IntlFreeShippingMinEQ(v int) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldIntlFreeShippingMin, v))
}

// IntlFreeShippingMinNEQ applies the NEQ predicate on the "intl_free_shipping_min" field.
func IntlFreeShippingMinNEQ(v int) predicate.Store {
	return predicate.Store(sql.FieldNEQ(FieldIntlFreeShippingMin, v))
}

// IntlFreeShippingMinIn applies the In predicate on the "intl_free_shipping_min" field.
func IntlFreeShippingMinIn(vs ...int) predicate.Store {
	return predicate.Store(sql.FieldIn(FieldIntlFreeShippingMin, vs...))
}

// IntlFreeShippingMinNotIn applies the NotIn predicate on the "intl_free_shipping_min" field.
func IntlFreeShippingMinNotIn(vs ...int) predicate.Store {
	return predicate.Store(sql.FieldNotIn(FieldIntlFreeShippingMin, vs...))
}

// IntlFreeShippingMinGT applies the GT predicate on the "intl_free_shipping_min" field.
func IntlFreeShippingMinGT(v int) predicate.Store {
	return predicate.Store(sql.FieldGT(FieldIntlFreeShippingMin, v))
}

// IntlFreeShippingMinGTE applies the GTE predicate on the "intl_free_shipping_min" field.
func IntlFreeShippingMinGTE(v int) predicate.Store {
	return predicate.Store(sql.FieldGTE(FieldIntlFreeShippingMin, v))
}

// IntlFreeShippingMinLT applies the LT predicate on the "intl_free_shipping_min" field.
func IntlFreeShippingMinLT(v int) predicate.Store {
	return predicate.Store(sql.FieldLT(FieldIntlFreeShippingMin, v))
}

// IntlFreeShippingMinLTE applies the LTE predicate on the "intl_free_shipping_min" field.
func IntlFreeShippingMinLTE(v int) predicate.Store {
	return predicate.Store(sql.FieldLTE(FieldIntlFreeShippingMin, v))
}

// DomesticShippingFeeEQ applies the EQ predicate on the "domestic_shipping_fee" field.
func DomesticShippingFeeEQ(v float64) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldDomesticShippingFee, v))
}

// DomesticShippingFeeNEQ applies the NEQ predicate on the "domestic_shipping_fee" field.
func DomesticShippingFeeNEQ(v float64) predicate.Store {
	return predicate.Store(sql.FieldNEQ(FieldDomesticShippingFee, v))
}

// DomesticShippingFeeIn applies the In predicate on the "domestic_shipping_fee" field.
func DomesticShippingFeeIn(vs ...float64) predicate.Store {
	return predicate.Store(sql.FieldIn(FieldDomesticShippingFee, vs...))
}

// DomesticShippingFeeNotIn applies the NotIn predicate on the "domestic_shipping_fee" field.
func DomesticShippingFeeNotIn(vs ...float64) predicate.Store {
	return predicate.Store(sql.FieldNotIn(FieldDomesticShippingFee, vs...))
}

// DomesticShippingFeeGT applies the GT predicate on the "domestic_shipping_fee" field.
func DomesticShippingFeeGT(v float64) predicate.Store {
	return predicate.Store(sql.FieldGT(FieldDomesticShippingFee, v))
}

// DomesticShippingFeeGTE applies the GTE predicate on the "domestic_shipping_fee" field.
func DomesticShippingFeeGTE(v float64) predicate.Store {
	return predicate.Store(sql.FieldGTE(FieldDomesticShippingFee, v))
}

// DomesticShippingFeeLT applies the LT predicate on the "domestic_shipping_fee" field.
func DomesticShippingFeeLT(v float64) predicate.Store {
	return predicate.Store(sql.FieldLT(FieldDomesticShippingFee, v))
}

// DomesticShippingFeeLTE applies the LTE predicate on the "domestic_shipping_fee" field.
func DomesticShippingFeeLTE(v float64) predicate.Store {
	return predicate.Store(sql.FieldLTE(FieldDomesticShippingFee, v))
}

// DomesticFreeShippingMinEQ applies the EQ predicate on the "domestic_free_shipping_min" field.
func DomesticFreeShippingMinEQ(v float64) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldDomesticFreeShippingMin, v))
}

// DomesticFreeShippingMinNEQ applies the NEQ predicate on the "domestic_free_shipping_min" field.
func DomesticFreeShippingMinNEQ(v float64) predicate.Store {
	return predicate.Store(sql.FieldNEQ(FieldDomesticFreeShippingMin, v))
}

// DomesticFreeShippingMinIn applies the In predicate on the "domestic_free_shipping_min" field.
func DomesticFreeShippingMinIn(vs ...float64) predicate.Store {
	return predicate.Store(sql.FieldIn(FieldDomesticFreeShippingMin, vs...))
}

// DomesticFreeShippingMinNotIn applies the NotIn predicate on the "domestic_free_shipping_min" field.
func DomesticFreeShippingMinNotIn(vs ...float64) predicate.Store {
	return predicate.Store(sql.FieldNotIn(FieldDomesticFreeShippingMin, vs...))
}

// DomesticFreeShippingMinGT applies the GT predicate on the "domestic_free_shipping_min" field.
func DomesticFreeShippingMinGT(v float64) predicate.Store {
	return predicate.Store(sql.FieldGT(FieldDomesticFreeShippingMin, v))
}

// DomesticFreeShippingMinGTE applies the GTE predicate on the "domestic_free_shipping_min" field.
func DomesticFreeShippingMinGTE(v float64) predicate.Store {
	return predicate.Store(sql.FieldGTE(FieldDomesticFreeShippingMin, v))
}

// DomesticFreeShippingMinLT applies the LT predicate on the "domestic_free_shipping_min" field.
func DomesticFreeShippingMinLT(v float64) predicate.Store {
	return predicate.Store(sql.FieldLT(FieldDomesticFreeShippingMin, v))
}

// DomesticFreeShippingMinLTE applies the LTE predicate on the "domestic_free_shipping_min" field.
func DomesticFreeShippingMinLTE(v float64) predicate.Store {
	return predicate.Store(sql.FieldLTE(FieldDomesticFreeShippingMin, v))
}

// ShippingFeeCumulationEQ applies the EQ predicate on the "shipping_fee_cumulation" field.
func ShippingFeeCumulationEQ(v bool) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldShippingFeeCumulation, v))
}

// ShippingFeeCumulationNEQ applies the NEQ predicate on the "shipping_fee_cumulation" field.
func ShippingFeeCumulationNEQ(v bool) predicate.Store {
	return predicate.Store(sql.FieldNEQ(FieldShippingFeeCumulation, v))
}

// DeliveryAgencyEQ applies the EQ predicate on the "delivery_agency" field.
func DeliveryAgencyEQ(v string) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldDeliveryAgency, v))
}

// DeliveryAgencyNEQ applies the NEQ predicate on the "delivery_agency" field.
func DeliveryAgencyNEQ(v string) predicate.Store {
	return predicate.Store(sql.FieldNEQ(FieldDeliveryAgency, v))
}

// DeliveryAgencyIn applies the In predicate on the "delivery_agency" field.
func DeliveryAgencyIn(vs ...string) predicate.Store {
	return predicate.Store(sql.FieldIn(FieldDeliveryAgency, vs...))
}

// DeliveryAgencyNotIn applies the NotIn predicate on the "delivery_agency" field.
func DeliveryAgencyNotIn(vs ...string) predicate.Store {
	return predicate.Store(sql.FieldNotIn(FieldDeliveryAgency, vs...))
}

// DeliveryAgencyGT applies the GT predicate on the "delivery_agency" field.
func DeliveryAgencyGT(v string) predicate.Store {
	return predicate.Store(sql.FieldGT(FieldDeliveryAgency, v))
}

// DeliveryAgencyGTE applies the GTE predicate on the "delivery_agency" field.
func DeliveryAgencyGTE(v string) predicate.Store {
	return predicate.Store(sql.FieldGTE(FieldDeliveryAgency, v))
}

// DeliveryAgencyLT applies the LT predicate on the "delivery_agency" field.
func DeliveryAgencyLT(v string) predicate.Store {
	return predicate.Store(sql.FieldLT(FieldDeliveryAgency, v))
}

// DeliveryAgencyLTE applies the LTE predicate on the "delivery_agency" field.
func DeliveryAgencyLTE(v string) predicate.Store {
	return predicate.Store(sql.FieldLTE(FieldDeliveryAgency, v))
}

// DeliveryAgencyContains applies the Contains predicate on the "delivery_agency" field.
func DeliveryAgencyContains(v string) predicate.Store {
	return predicate.Store(sql.FieldContains(FieldDeliveryAgency, v))
}

// DeliveryAgencyHasPrefix applies the HasPrefix predicate on the "delivery_agency" field.
func DeliveryAgencyHasPrefix(v string) predicate.Store {
	return predicate.Store(sql.FieldHasPrefix(FieldDeliveryAgency, v))
}

// DeliveryAgencyHasSuffix applies the HasSuffix predicate on the "delivery_agency" field.
func DeliveryAgencyHasSuffix(v string) predicate.Store {
	return predicate.Store(sql.FieldHasSuffix(FieldDeliveryAgency, v))
}

// DeliveryAgencyEqualFold applies the EqualFold predicate on the "delivery_agency" field.
func DeliveryAgencyEqualFold(v string) predicate.Store {
	return predicate.Store(sql.FieldEqualFold(FieldDeliveryAgency, v))
}

// DeliveryAgencyContainsFold applies the ContainsFold predicate on the "delivery_agency" field.
func DeliveryAgencyContainsFold(v string) predicate.Store {
	return predicate.Store(sql.FieldContainsFold(FieldDeliveryAgency, v))
}

// BrokerFeeEQ applies the EQ predicate on the "broker_fee" field.
func BrokerFeeEQ(v bool) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldBrokerFee, v))
}

// BrokerFeeNEQ applies the NEQ predicate on the "broker_fee" field.
func BrokerFeeNEQ(v bool) predicate.Store {
	return predicate.Store(sql.FieldNEQ(FieldBrokerFee, v))
}

// DdpEQ applies the EQ predicate on the "ddp" field.
func DdpEQ(v bool) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldDdp, v))
}

// DdpNEQ applies the NEQ predicate on the "ddp" field.
func DdpNEQ(v bool) predicate.Store {
	return predicate.Store(sql.FieldNEQ(FieldDdp, v))
}

// UpdatedAtEQ applies the EQ predicate on the "updated_at" field.
func UpdatedAtEQ(v time.Time) predicate.Store {
	return predicate.Store(sql.FieldEQ(FieldUpdatedAt, v))
}

// UpdatedAtNEQ applies the NEQ predicate on the "updated_at" field.
func UpdatedAtNEQ(v time.Time) predicate.Store {
	return predicate.Store(sql.FieldNEQ(FieldUpdatedAt, v))
}

// UpdatedAtIn applies the In predicate on the "updated_at" field.
func UpdatedAtIn(vs ...time.Time) predicate.Store {
	return predicate.Store(sql.FieldIn(FieldUpdatedAt, vs...))
}

// UpdatedAtNotIn applies the NotIn predicate on the "updated_at" field.
func UpdatedAtNotIn(vs ...time.Time) predicate.Store {
	return predicate.Store(sql.FieldNotIn(FieldUpdatedAt, vs...))
}

// UpdatedAtGT applies the GT predicate on the "updated_at" field.
func UpdatedAtGT(v time.Time) predicate.Store {
	return predicate.Store(sql.FieldGT(FieldUpdatedAt, v))
}

// UpdatedAtGTE applies the GTE predicate on the "updated_at" field.
func UpdatedAtGTE(v time.Time) predicate.Store {
	return predicate.Store(sql.FieldGTE(FieldUpdatedAt, v))
}

// UpdatedAtLT applies the LT predicate on the "updated_at" field.
func UpdatedAtLT(v time.Time) predicate.Store {
	return predicate.Store(sql.FieldLT(FieldUpdatedAt, v))
}

// UpdatedAtLTE applies the LTE predicate on the "updated_at" field.
func UpdatedAtLTE(v time.Time) predicate.Store {
	return predicate.Store(sql.FieldLTE(FieldUpdatedAt, v))
}

// HasProduct applies the HasEdge predicate on the "product" edge.
func HasProduct() predicate.Store {
	return predicate.Store(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, ProductTable, ProductColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasProductWith applies the HasEdge predicate on the "product" edge with a given conditions (other predicates).
func HasProductWith(preds ...predicate.Product) predicate.Store {
	return predicate.Store(func(s *sql.Selector) {
		step := newProductStep()
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups predicates with the AND operator between them.
func And(predicates ...predicate.Store) predicate.Store {
	return predicate.Store(sql.AndPredicates(predicates...))
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.Store) predicate.Store {
	return predicate.Store(sql.OrPredicates(predicates...))
}

// Not applies the not operator on the given predicate.
func Not(p predicate.Store) predicate.Store {
	return predicate.Store(sql.NotPredicates(p))
}
