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

type RoleHandler interface {
	CreateRoleWithDetails(ctx *gin.Context)
	GetAllRolesList(ctx *gin.Context)
	GetRoleById(ctx *gin.Context)
	UpdateRole(ctx *gin.Context)
	DeleteRole(ctx *gin.Context)
}

type roleHandler struct {
	repo repository.RoleRepository
}

func NewRoleHandler() RoleHandler {
	return &roleHandler{
		repo: repository.NewRoleRepository(),
	}
}

// --------------- Create methods --------------------
func (h *roleHandler) CreateRoleWithDetails(ctx *gin.Context) {
	var role model.Role

	if err := ctx.ShouldBindJSON(&role); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	role, err := h.repo.CreateRoleWithDetails(role)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, role)
}

// --------------- Read methods ---------------------
func (h *roleHandler) GetAllRolesList(ctx *gin.Context) {
	roleList, err := h.repo.GetAllRolesList()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while fetching role list.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"GetAllRoleList fetched successfully.",
		zap.String("role", fmt.Sprint(roleList)),
	)
	ctx.JSON(http.StatusOK, roleList)
}

func (h *roleHandler) GetRoleById(ctx *gin.Context) {
	roleIDStr := ctx.Param("roleID")
	roleID, err := uuid.Parse(roleIDStr)
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

	role, err := h.repo.GetRoleById(roleID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while fetching role using ID.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"GetRoleWithID fetched successfully.",
		zap.String("role", fmt.Sprint(role)),
	)
	ctx.JSON(http.StatusOK, role)
}

// ---------------- Update methods ------------------
func (h *roleHandler) UpdateRole(ctx *gin.Context) {
	var role model.Role
	if err := ctx.ShouldBindJSON(&role); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Received bad request from the client.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
		)
		return
	}

	roleIDStr := ctx.Param("roleID")
	roleID, err := uuid.Parse(roleIDStr)
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

	role.ID = roleID
	role, err = h.repo.UpdateRole(role)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while updaing role details.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"UpdatedRole successfully.",
		zap.String("role", fmt.Sprint(role)),
	)
	ctx.JSON(http.StatusOK, role)
}

// ----------------- Delete methods -------------------
func (h *roleHandler) DeleteRole(ctx *gin.Context) {
	var role model.Role
	roleIDStr := ctx.Param("roleID")
	roleID, err := uuid.Parse(roleIDStr)
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

	role.ID = roleID
	role, err = h.repo.DeleteRole(role)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while deleting role.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"Deleted Role successfully.",
		zap.String("role", fmt.Sprint(role)),
	)
	ctx.JSON(http.StatusOK, role)
}
