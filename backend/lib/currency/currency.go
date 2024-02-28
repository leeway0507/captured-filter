package currency

import (
	"backend/lib/local_file"
	"encoding/json"
	"encoding/xml"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"strconv"
	"strings"
	"time"
)

type CustomXMLItem struct {
	CurrSgn string  `xml:"currSgn"`
	Fxrt    float32 `xml:"fxrt"`
}

type CustomXMLItems struct {
	Item []CustomXMLItem `xml:"item"`
}

type CustomXMLBody struct {
	Items CustomXMLItems `xml:"items"`
}

type CustomXMLHeader struct {
	ResultCode string `xml:"resultCode"`
	ResultMsg  string `xml:"resultMsg"`
}

type CustomResponse struct {
	Header CustomXMLHeader `xml:"header"`
	Body   CustomXMLBody   `xml:"body"`
}

type BuyingJsonItems struct {
	CurUnit string `json:"cur_unit"`
	Tts     string `json:"tts"`
}

type BuyingResponse struct {
	Items []BuyingJsonItems
}

type CurrencyData struct {
	Update string
	Data   map[string]float32
}

type Currency struct {
	CustomCurrency CurrencyData
	BuyingCurrency CurrencyData
}

func NewCurrency() *Currency {
	c := &Currency{}
	c.GetCustomCurrency()
	c.GetBuyingCurrency()
	return c
}

var today = strings.Replace(time.Now().Format(time.DateOnly), "-", "", -1)

func (c *Currency) GetCustomCurrency() {
	data, err := c.LoadCurrency("custom")

	if err != nil || data.Update != today {
		data, err := c.GetCustomCurrencyFromAPI()

		if err != nil {
			panic(err)
		}

		if err := c.SaveCurrency(*data, "custom"); err != nil {
			panic(err)
		}
		c.CustomCurrency = *data
		return
	}

	c.CustomCurrency = *data

}

func (c *Currency) GetCustomCurrencyFromAPI() (*CurrencyData, error) {

	url, err := c.CustomReqUrl()
	if err != nil {
		return nil, err
	}

	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	// Read the response body
	body, err := io.ReadAll(resp.Body)

	if err != nil {
		return nil, err
	}

	customData, err := c.extractCustomData(body)

	if err != nil {
		return nil, err
	}

	return customData, nil
}
func (c *Currency) CustomReqUrl() (string, error) {
	baseUrl := "http://apis.data.go.kr/1220000/retrieveTrifFxrtInfo/getRetrieveTrifFxrtInfo"
	reqestUrl, err := url.Parse(baseUrl)

	if err != nil {
		return "", err
	}

	params := url.Values{}
	params.Add("serviceKey", os.Getenv("CUSTOM_CURRENCY_API_KEY"))
	params.Add("aplyBgnDt", today)
	params.Add("weekFxrtTpcd", "2")
	reqestUrl.RawQuery = params.Encode()
	return reqestUrl.String(), nil
}

func (c *Currency) extractCustomData(body []byte) (*CurrencyData, error) {
	var customXML CustomResponse
	err := xml.Unmarshal(body, &customXML)

	if err != nil {
		return nil, err
	}

	currencyData := make(map[string]float32)
	for _, item := range customXML.Body.Items.Item {
		currencyData[item.CurrSgn] = item.Fxrt
	}
	result := CurrencyData{Update: today, Data: currencyData}

	return &result, nil
}

func (c *Currency) GetBuyingCurrency() {
	data, err := c.LoadCurrency("buying")

	if err != nil || data.Update != today {
		data, err := c.GetBuyingCurrencyFromAPI()

		if err != nil {
			log.Fatalf("GetBuyingCurrencyFromAPI error: %s", err)
		}

		if err := c.SaveCurrency(*data, "buying"); err != nil {
			log.Fatalf("SaveCurrency error: %s", err)
		}
		c.BuyingCurrency = *data

		return
	}

	c.BuyingCurrency = *data

}

func (c *Currency) GetBuyingCurrencyFromAPI() (*CurrencyData, error) {
	url, err := c.BuyingReqUrl()
	if err != nil {
		return nil, err
	}
	for i := 0; i < 5; i++ {
		oldDate := time.Now().AddDate(0, 0, -(i - 1)).Format(time.DateOnly)
		oldDate = strings.Replace(oldDate, "-", "", -1)

		reqDate := time.Now().AddDate(0, 0, -i).Format(time.DateOnly)
		reqDate = strings.Replace(reqDate, "-", "", -1)

		url = strings.Replace(url, oldDate, reqDate, -1)

		CurrencyData, err := c.getBuyingCurrencyFromAPI(url)
		if err != nil {
			return nil, err
		}
		var d = *CurrencyData
		_, ok := d.Data["KRW"]

		if ok {
			return CurrencyData, nil
		}

	}
	return &CurrencyData{}, nil

}
func (c *Currency) getBuyingCurrencyFromAPI(url string) (*CurrencyData, error) {

	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	// Read the response body
	body, err := io.ReadAll(resp.Body)

	if err != nil {
		return nil, err
	}

	customData, err := c.extractBuyingData(body)

	if err != nil {
		return nil, err
	}

	return customData, nil

}

func (c *Currency) BuyingReqUrl() (string, error) {
	baseUrl := "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON"
	reqestUrl, err := url.Parse(baseUrl)

	if err != nil {
		return "", err
	}

	params := url.Values{}
	params.Add("authkey", os.Getenv("BUYING_CURRENCY_API_KEY"))
	params.Add("searchdate", today)
	params.Add("data", "AP01")

	reqestUrl.RawQuery = params.Encode()
	return reqestUrl.String(), nil

}

func (c *Currency) extractBuyingData(body []byte) (*CurrencyData, error) {
	var rawData []BuyingJsonItems
	err := json.Unmarshal(body, &rawData)
	if err != nil {
		return nil, err
	}

	currencyData := make(map[string]float32)
	for _, item := range rawData {
		c := strings.Replace(item.Tts, ",", "", -1)
		floatC, err := strconv.ParseFloat(c, 32)

		if err != nil {
			return nil, err
		}
		if item.CurUnit == "JPY(100)" {
			currencyData["JPY"] = float32(floatC)
			continue
		}

		currencyData[item.CurUnit] = float32(floatC)
	}

	return &CurrencyData{Update: today, Data: currencyData}, nil
}

func (c *Currency) LoadCurrency(fileName string) (*CurrencyData, error) {

	var data CurrencyData
	filePath := fmt.Sprintf("./data/%s.json", fileName)
	err := local_file.LoadJson(filePath, &data)

	if err != nil {
		return nil, err
	}

	return &data, err
}

func (c *Currency) SaveCurrency(data CurrencyData, fileName string) error {
	jsonData, err := json.MarshalIndent(data, "", "    ")
	if err != nil {
		return err
	}
	filePath := fmt.Sprintf("./data/%s.json", fileName)

	file, err := os.Create(filePath)
	if err != nil {
		return err
	}
	defer file.Close()

	_, err = file.Write(jsonData)
	if err != nil {
		return err
	}

	fmt.Printf("successfully save %s \n path: %s", fileName, filePath)

	return nil
}
