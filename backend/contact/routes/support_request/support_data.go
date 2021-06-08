package support_request

import (
	"database/sql/driver"
	"encoding/json"
)


func (j SupportData) Value() (driver.Value, error) {
	valueString, err := json.Marshal(j)
	return string(valueString), err
}

func (j *SupportData) Scan(value interface{}) error {
	if err := json.Unmarshal(value.([]byte), &j); err != nil {
		return err
	}

	return nil
}

type SupportData struct {
	Roles          struct {
		Benefactor        bool `json:"benefactor"`
		Partner           bool `json:"partner"`
		AssociationMember bool `json:"associationMember"`
		Company          bool `json:"company"`
		Volunteer         bool `json:"volunteer"`
	} `json:"roles"`
	Benefactor struct {
		CampaignBenefactor bool `json:"campaignBenefactor"`
		PlatformBenefactor bool `json:"platformBenefactor"`
	} `json:"benefactor"`
	Partner struct {
		Npo       bool   `json:"npo"`
		Bussiness bool   `json:"bussiness"`
		Other     bool   `json:"other"`
		OtherText string `json:"otherText"`
	} `json:"partner"`
	Volunteer struct {
		Backend             bool `json:"backend"`
		Frontend            bool `json:"frontend"`
		Marketing           bool `json:"marketing"`
		Designer            bool `json:"designer"`
		ProjectManager      bool `json:"projectManager"`
		DevOps              bool `json:"devOps"`
		Security            bool `json:"security"`
		FinancesAndAccounts bool `json:"financesAndAccounts"`
		Lawyer              bool `json:"lawyer"`
		Qa                  bool `json:"qa"`
	} `json:"volunteer"`
	AssociationMember struct {
		IsMember bool `json:"isMember"`
	} `json:"associationMember"`
	Company struct {
		Sponsor      bool   `json:"sponsor"`
		Volunteer    bool   `json:"volunteer"`
		Other        bool   `json:"other"`
		OtherText    string `json:"otherText"`
	} `json:"company"`
}
