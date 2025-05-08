sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/m/MessagePopover",
	"sap/m/MessageItem",
	"sap/ui/core/library",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, MessageToast, MessageBox, MessagePopover, MessageItem, coreLibrary, Filter, FilterOperator) {
	"use strict";

	// Shortcut for sap.ui.core.MessageType
	var MessageType = coreLibrary.MessageType;

	return Controller.extend("converted.customerorderportalview.controller.CustomerOrderPortalView", {
		onInit: function () {
			// Initialize models

			// Message model for MessageArea/MessagePopover
			var oMessageModel = new JSONModel({
				messages: [{
					type: MessageType.Success,
					title: "System Information",
					description: "Application converted successfully from WebDynpro",
					subtitle: "Conversion complete",
					counter: 1
				}, {
					type: MessageType.Information,
					title: "Warehouse Closure",
					description: "Our warehouse will be closed on April 15, 2025 for scheduled maintenance.",
				}, {
					type: MessageType.Success,
					title: "New Products",
					description: "New products added to catalog: High-Performance Materials Series X500.",
				}, {
					type: MessageType.Warning,
					title: "Order Delay",
					description: "Order #OR-78945 is delayed due to supply chain issues. Expected shipping: April 10, 2025.",
				}]
			});
			this.getView().setModel(oMessageModel, "messages");

			// Load mock data
			var oProductsModel = new JSONModel();
			oProductsModel.loadData(sap.ui.require.toUrl("converted/customerorderportalview/model/mockData/products.json"));
			this.getView().setModel(oProductsModel, "products");

			var oOrdersModel = new JSONModel();
			oOrdersModel.loadData(sap.ui.require.toUrl("converted/customerorderportalview/model/mockData/orders.json"));
			this.getView().setModel(oOrdersModel, "orders");

			var oCustomersModel = new JSONModel();
			oCustomersModel.loadData(sap.ui.require.toUrl("converted/customerorderportalview/model/mockData/customers.json"));
			this.getView().setModel(oCustomersModel, "customers");

			// Set demo model on this sample
			var oViewModel = new JSONModel({
				currency: "USD",
				currentUser: {
					displayName: "John Doe",
					customerId: "CUST-12345"
				}
			});
			this.getView().setModel(oViewModel, "view");

			// Converted from WebDynpro: 2025-05-08T07:19:35.143Z
		},

		// Event handlers
		onBeforeRendering: function () {
			// Prepare data before rendering
		},

		onAfterRendering: function () {
			// Adjust UI after rendering
		},

		// Enhanced event handlers for special WebDynpro elements

		/**
		 * Handle value help request (for ValueHelp / F4 elements)
		 * @param {sap.ui.base.Event} oEvent The event object
		 */
		handleValueHelp: function (oEvent) {
			var oSource = oEvent.getSource();

			// Create value help dialog if it doesn't exist
			if (!this._valueHelpDialog) {
				this._valueHelpDialog = new sap.m.SelectDialog({
					title: "Select Value",
					confirm: function (oEvent) {
						var oSelectedItem = oEvent.getParameter("selectedItem");
						if (oSelectedItem) {
							oSource.setValue(oSelectedItem.getTitle());
						}
					}
				});

				// Sample items - would be filled with actual data in a real app
				var oDialogModel = new JSONModel({
					items: [{
						title: "Item 1",
						description: "Description 1"
					}, {
						title: "Item 2",
						description: "Description 2"
					}, {
						title: "Item 3",
						description: "Description 3"
					}]
				});

				this._valueHelpDialog.setModel(oDialogModel);
				this._valueHelpDialog.bindAggregation("items", {
					path: "/items",
					template: new sap.m.StandardListItem({
						title: "{title}",
						description: "{description}"
					})
				});
			}

			// Open the dialog
			this._valueHelpDialog.open();
		},

		/**
		 * Handle file download requests (for FileDownload elements)
		 * @param {sap.ui.base.Event} oEvent The event object
		 */
		onFileDownload: function (oEvent) {
			// In a real application, this would be connected to a backend service
			// For now, we'll show a message
			MessageToast.show("File download initiated");

			// Sample approach to download a file:
			// var sUrl = "/api/downloadFile?id=123";
			// var link = document.createElement("a");
			// link.href = sUrl;
			// link.download = "filename.pdf";
			// link.click();
		},

		/**
		 * Open message popover (for MessageArea elements)
		 * @param {sap.ui.base.Event} oEvent The event object
		 */
		handleMessagePopoverPress: function (oEvent) {
			if (!this._messagePopover) {
				this._messagePopover = new MessagePopover({
					items: {
						path: "messages>/messages",
						template: new MessageItem({
							type: "{messages>type}",
							title: "{messages>title}",
							description: "{messages>description}",
							subtitle: "{messages>subtitle}",
							counter: "{messages>counter}"
						})
					}
				});

				this.getView().byId("messagePopoverBtn").addDependent(this._messagePopover);
			}

			this._messagePopover.toggle(oEvent.getSource());
		},

		/**
		 * Handle navigation link press events
		 * @param {sap.ui.base.Event} oEvent The event object
		 */
		onNavigationLinkPress: function (oEvent) {
			var oSource = oEvent.getSource();
			var sHref = oSource.getHref();

			if (sHref) {
				// If href is set, let the default behavior handle it
				return;
			}

			// Otherwise, handle the navigation programmatically
			var sNavTarget = oSource.data("navTarget");
			if (sNavTarget) {
				MessageToast.show("Navigating to: " + sNavTarget);
				// In a real application, this would navigate to the appropriate view or application
				// using the router
			}
		},

		/**
		 * Handle office control rendering
		 * @param {sap.ui.base.Event} oEvent The event object
		 */
		onOfficeControlRendered: function (oEvent) {
			// This would normally integrate with MS Office API or similar
			// In a converted application, this would be replaced by a more appropriate solution
			console.log("Office control container rendered");

			var oSource = oEvent.getSource();
			var sDomRef = oSource.getDomRef();
			if (sDomRef) {
				sDomRef.innerHTML = '<div class="sapUiMediumMargin">' +
					'<div class="sapUiMediumMarginBottom">' +
					'<span class="sapUiIcon sapUiIconMirrorInRTL" style="font-family:SAP-icons;color:#0854a0;font-size:2.5rem">&#xe0ef;</span>' +
					'</div>' +
					'<div class="sapMText">' +
					'<p>Office document integration would be configured here.</p>' +
					'<p>In SAPUI5, this typically uses OData services with MS Graph API integration.</p>' +
					'</div>' +
					'</div>';
			}
		},

		/**
		 * Open dialog
		 * This is a generic handler for WebDynpro dialog elements
		 * @param {sap.ui.base.Event} oEvent The event object
		 */
		openDialog: function (oEvent) {
			// Get the dialog ID from the source control
			var oSource = oEvent.getSource();
			var sDialogId = oSource.data("dialogId") || "confirmDialog";

			// Find the dialog in the view
			var oDialog = this.getView().byId(sDialogId);
			if (oDialog) {
				oDialog.open();
			} else {
				MessageToast.show("Dialog with ID '" + sDialogId + "' not found");
			}
		},

		/**
		 * Close dialog
		 * @param {sap.ui.base.Event} oEvent The event object
		 */
		closeDialog: function (oEvent) {
			var oDialog = oEvent.getSource().getParent();
			oDialog.close();
		},

		/**
		 * Handle dialog confirm button press
		 * @param {sap.ui.base.Event} oEvent The event object
		 */
		onDialogConfirm: function (oEvent) {
			// Handle dialog confirmation logic
			MessageToast.show("Dialog confirmed");
			this.closeDialog(oEvent);
		},

		/**
		 * Handle dialog cancel button press
		 * @param {sap.ui.base.Event} oEvent The event object
		 */
		onDialogCancel: function (oEvent) {
			// Handle dialog cancellation
			this.closeDialog(oEvent);
		},

		/**
		 * Called when the "Create New Order" button is pressed.
		 * @public
		 */
		onCreateNewOrder: function () {
			MessageToast.show("Create New Order button pressed");
		},

		/**
		 * Called when the "View Order Status" button is pressed.
		 * @public
		 */
		onViewOrderStatus: function () {
			MessageToast.show("View Order Status button pressed");
		},

		/**
		 * Called when the "View Catalog" button is pressed.
		 * @public
		 */
		onViewCatalog: function () {
			MessageToast.show("View Catalog button pressed");
		},

		/**
		 * Called when the "Contact Support" button is pressed.
		 * @public
		 */
		onContactSupport: function () {
			MessageToast.show("Contact Support button pressed");
		},

		/**
		 * Called when the "Download Price List" button is pressed.
		 * @public
		 */
		onDownloadPriceList: function () {
			MessageToast.show("Download Price List button pressed");
		},

		/**
		 * Called when the "Help" button is pressed.
		 * @public
		 */
		onHelp: function () {
			MessageToast.show("Help button pressed");
		},

		/**
		 * Called when the "Terms & Conditions" button is pressed.
		 * @public
		 */
		onTermsAndConditions: function () {
			MessageToast.show("Terms & Conditions button pressed");
		},

		/**
		 * Called when the "Privacy Policy" button is pressed.
		 * @public
		 */
		onPrivacyPolicy: function () {
			MessageToast.show("Privacy Policy button pressed");
		},

		/**
		 * Called when the "Contact Us" button is pressed.
		 * @public
		 */
		onContactUs: function () {
			MessageToast.show("Contact Us button pressed");
		},

		/**
		 * Called when the "Logout" button is pressed.
		 * @public
		 */
		onLogout: function () {
			MessageToast.show("Logout button pressed");
		},
		/**
		 * Called when a tab filter is selected in the IconTabBar.
		 * @param {sap.ui.base.Event} oEvent The selection change event.
		 */
		onTabSelect: function (oEvent) {
			var sKey = oEvent.getParameter("key");

			// Show a message based on the selected tab
			MessageToast.show("Tab '" + sKey + "' selected");

			// You can add more logic here to load data or update the UI based on the selected tab
		},

		/**
		 * Called when apply filters button is pressed in My Orders tab.
		 */
		onApplyOrderFilters: function (oEvent) {
			var oView = this.getView();
			var oTable = oView.byId("ordersTable");
			var oBinding = oTable.getBinding("items");

			// Get filter values
			var sStatusKey = oView.byId("orderStatusFilter").getSelectedKey();
			var oStartDate = oView.byId("orderStartDate").getDateValue();
			var oEndDate = oView.byId("orderEndDate").getDateValue();
			var sSearchQuery = oView.byId("orderSearchField").getValue();

			// Create filters
			var aFilters = [];

			if (sStatusKey !== "ALL") {
				aFilters.push(new Filter("status", FilterOperator.EQ, sStatusKey));
			}

			if (oStartDate && oEndDate) {
				aFilters.push(new Filter("orderDate", FilterOperator.BT, oStartDate, oEndDate));
			} else if (oStartDate) {
				aFilters.push(new Filter("orderDate", FilterOperator.GE, oStartDate));
			} else if (oEndDate) {
				aFilters.push(new Filter("orderDate", FilterOperator.LE, oEndDate));
			}

			if (sSearchQuery) {
				aFilters.push(new Filter({
					filters: [
						new Filter("orderId", FilterOperator.Contains, sSearchQuery),
						new Filter("products", FilterOperator.Contains, sSearchQuery)
					],
					and: false
				}));
			}

			// Apply filters to binding
			oBinding.filter(aFilters);
			MessageToast.show("Filters applied!");
		},

		/**
		 * Reset all filters
		 */
		onResetOrderFilters: function (oEvent) {
			var oView = this.getView();
			var oTable = oView.byId("ordersTable");
			var oBinding = oTable.getBinding("items");

			// Reset filter values
			oView.byId("orderStatusFilter").setSelectedKey("ALL");
			oView.byId("orderStartDate").setValue(null);
			oView.byId("orderEndDate").setValue(null);
			oView.byId("orderSearchField").setValue(null);

			// Reset filters
			oBinding.filter([]);
			MessageToast.show("Filters reset!");
		},
		onProductSelected: function (oEvent) {

		},

		/**
		 * Called when tab is selected
		 * @param {sap.ui.base.Event} oEvent The tab selection event.
		 */
		onTabSelect: function (oEvent) {
			var sKey = oEvent.getParameter("key");
			// Add logic to load data or update the UI based on the selected tab
			switch (sKey) {
				case "dashboard":
					// Load dashboard data
					break;
				case "myOrders":
					// Load my orders data
					break;
				case "productCatalog":
					// Load product catalog data
					break;
				case "shoppingCart":
					// Load shopping cart data
					break;
				case "accountSettings":
					// Load account settings data
					break;
				default:
					break;
			}
			MessageToast.show("Tab '" + sKey + "' selected");
		}
	});
});
