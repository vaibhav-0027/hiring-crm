package middleware

import (
	"net/http"

	"github.com/vaibhav-0027/hiring-crm/handler"
	"github.com/vaibhav-0027/hiring-crm/utils"

	"github.com/gin-gonic/gin"
)

func AuthorizeJWT() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		const BearerSchema string = "Bearer "
		authHeader := ctx.GetHeader("Authorization")
		if authHeader == "" {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "No Authorization header found",
			})
			return
		}

		tokenString := authHeader[len(BearerSchema):]

		_, err := handler.ValidateToken(tokenString)

		if err != nil {
			utils.Logger.Debug("Failed to validate token")
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "Not Valid Token",
			})
		}
		// else {
		// if _, ok := token.Claims.(jwt.MapClaims); !ok {
		// 	ctx.AbortWithStatus(http.StatusUnauthorized)
		// }
		// else {
		// 	if token.Valid {
		// 		ctx.Set("userID", claims["userID"])
		// 	} else {
		// 		ctx.AbortWithStatus(http.StatusUnauthorized)
		// 	}
		// }
		// }
	}
}
