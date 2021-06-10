package support_request

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

const personPayload = `{
	"address": "Sofia",
	"comment": "Comment",
	"email": "test@example.com",
	"name": "John Doe",
	"phone": "+35983333333333",
	"gdpr": true,
	"terms": true,
	"newsletter": true
}`

func TestPerson_Scan(t *testing.T) {
	// given
	jsonb := &Person{}

	// when
	err := jsonb.Scan(personPayload)

	// then
	assert.NoError(t, err)
}

func TestPerson_Value(t *testing.T) {
	// given
	jsonb := &Person{}
	_ = jsonb.Scan(personPayload)

	// when
	value, err := jsonb.Value()

	// then
	assert.NoError(t, err)
	assert.JSONEqf(t, personPayload, fmt.Sprintf("%v", value), "payload-differs")
}
