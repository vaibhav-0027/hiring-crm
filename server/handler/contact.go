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

type ContactHandler interface {
	CreateContact(ctx *gin.Context)
	GetAllContactList(ctx *gin.Context)
	GetContactWithID(ctx *gin.Context)
	GetContactListForCompany(ctx *gin.Context)
	UpdateContact(ctx *gin.Context)
	DeleteContact(ctx *gin.Context)
}

type contactHandler struct {
	repo repository.ContactRepository
}

func NewContactHandler() ContactHandler {
	return &contactHandler{
		repo: repository.NewContactRepository(),
	}
}

// -------------- Create methods -----------------
func (h *contactHandler) CreateContact(ctx *gin.Context) {
	var contact model.Contact
	if err := ctx.ShouldBindJSON(&contact); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Received bad request from the client.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
		)
		return
	}

	contact, err := h.repo.CreateContact(contact)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while creating contact.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"Created Contact successfully.",
		zap.String("contact", fmt.Sprint(contact)),
	)
	ctx.JSON(http.StatusOK, contact)
}

// -------------- Read methods ------------------
func (h *contactHandler) GetAllContactList(ctx *gin.Context) {
	contactList, err := h.repo.GetAllContactList()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while fetching company list.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"GetAllContactList fetched successfully.",
		zap.String("contact", fmt.Sprint(contactList)),
	)
	ctx.JSON(http.StatusOK, contactList)
}

func (h *contactHandler) GetContactWithID(ctx *gin.Context) {
	contactIDStr := ctx.Param("contactID")
	contactID, err := uuid.Parse(contactIDStr)
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

	contact, err := h.repo.GetContactWithID(contactID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while fetching contact using ID.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"Get Contact with ID fetched successfully.",
		zap.String("contact", fmt.Sprint(contact)),
	)
	ctx.JSON(http.StatusOK, contact)
}

func (h *contactHandler) GetContactListForCompany(ctx *gin.Context) {
	companyIDStr := ctx.Param("companyID")
	companyID, err := uuid.Parse(companyIDStr)
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

	contactList, err := h.repo.GetContactListForCompany(companyID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while fetching contacts for company.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"Get Contact List for vacancy fetched successfully.",
		zap.String("contactList", fmt.Sprint(contactList)),
	)
	ctx.JSON(http.StatusOK, contactList)
}

// -------------- Update methods ------------------
func (h *contactHandler) UpdateContact(ctx *gin.Context) {
	var contact model.Contact
	if err := ctx.ShouldBindJSON(&contact); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Received bad request from the client.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
		)
		return
	}

	contactIDStr := ctx.Param("contactID")
	contactID, err := uuid.Parse(contactIDStr)
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

	contact.ID = contactID
	contact, err = h.repo.UpdateContact(contact)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while updaing contact details.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"Updated Contact successfully.",
		zap.String("contact", fmt.Sprint(contact)),
	)
	ctx.JSON(http.StatusOK, contact)
}

// -------------- Delete methods -------------------
func (h *contactHandler) DeleteContact(ctx *gin.Context) {
	var contact model.Contact
	contactIDStr := ctx.Param("contactID")
	contactID, err := uuid.Parse(contactIDStr)
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

	contact.ID = contactID
	contact, err = h.repo.DeleteContact(contact)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while deleting contact.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"Deleted Contact successfully.",
		zap.String("contact", fmt.Sprint(contact)),
	)
	ctx.JSON(http.StatusOK, contact)
}
