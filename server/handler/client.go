package handler

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/vaibhav-0027/hiring-crm/model"
	"github.com/vaibhav-0027/hiring-crm/repository"
	"github.com/vaibhav-0027/hiring-crm/utils"
	"go.uber.org/zap"
)

type ClientHandler interface {
	CreateClient(ctx *gin.Context)
	GetClientWithID(ctx *gin.Context)
	GetAllClientList(ctx *gin.Context)
	UpdateClient(ctx *gin.Context)
	DeleteClient(ctx *gin.Context)
}

type clientHandler struct {
	repo repository.ClientRepository
}

func NewClientHandler() ClientHandler {
	return &clientHandler{
		repo: repository.NewClientRepository(),
	}
}

// -------------- Create methods -----------------
func (h *clientHandler) CreateClient(ctx *gin.Context) {
	var client model.Client
	if err := ctx.ShouldBindJSON(&client); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Received bad request from the client.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
		)
		return
	}

	client, err := h.repo.CreateClient(client)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while creating client.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"Created Client successfully.",
		zap.String("client", fmt.Sprint(client)),
	)
	ctx.JSON(http.StatusOK, client)
}

// -------------- Read methods ------------------
func (h *clientHandler) GetClientWithID(ctx *gin.Context) {
	clientIDStr := ctx.Param("clientID")
	clientID, err := uuid.Parse(clientIDStr)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Received bad request from the client.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
		)
		return
	}

	client, err := h.repo.GetClientWithID(clientID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while fetching client using ID.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"Get Client with ID fetched successfully.",
		zap.String("client", fmt.Sprint(client)),
	)
	ctx.JSON(http.StatusOK, client)
}

func (h *clientHandler) GetAllClientList(ctx *gin.Context) {
	clientList, err := h.repo.GetAllClientList()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while fetching clients for company.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"Get Client List for vacancy fetched successfully.",
		zap.String("clientList", fmt.Sprint(clientList)),
	)
	ctx.JSON(http.StatusOK, clientList)
}

// -------------- Update methods ------------------
func (h *clientHandler) UpdateClient(ctx *gin.Context) {
	var client model.Client
	if err := ctx.ShouldBindJSON(&client); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Received bad request from the client.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
		)
		return
	}

	clientIDStr := ctx.Param("clientID")
	clientID, err := uuid.Parse(clientIDStr)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Received bad request from the client.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
		)
		return
	}

	client.ID = clientID
	client, err = h.repo.UpdateClient(client)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while updaing client details.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"Updated Client successfully.",
		zap.String("client", fmt.Sprint(client)),
	)
	ctx.JSON(http.StatusOK, client)
}

// -------------- Delete methods -------------------
func (h *clientHandler) DeleteClient(ctx *gin.Context) {
	var client model.Client
	clientIDStr := ctx.Param("clientID")
	clientID, err := uuid.Parse(clientIDStr)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Received bad request from the client.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
		)
		return
	}

	client.ID = clientID
	client, err = h.repo.DeleteClient(client)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while deleting client.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"Deleted Client successfully.",
		zap.String("client", fmt.Sprint(client)),
	)
	ctx.JSON(http.StatusOK, client)
}
