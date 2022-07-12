package handler

import (
	"fmt"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
)

func GenerateToken(userid uint) string {
	claims := jwt.MapClaims{
		"exp":    time.Now().Add(time.Hour * 3).Unix(),
		"iat":    time.Now().Unix(),
		"userID": userid,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	t, _ := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	return t

}

func ValidateToken(token string) (*jwt.Token, error) {
	claims := jwt.MapClaims{}
	newToken, _ := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {

		return []byte("secret"), nil
	})

	if claims["aud"] == "hiring-crm" && claims["firebase"] != nil {
		return newToken, nil
	}

	return nil, fmt.Errorf("Invalid token")
}
