package currency

import "backend/lib/currency"

var currImpl = currency.NewCurrency()

func GetCurrency() map[string]currency.CurrencyData {
	return currImpl.GetCurrency()
}
