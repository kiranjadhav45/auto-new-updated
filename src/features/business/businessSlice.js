import { createSlice } from "@reduxjs/toolkit";
import produce from 'immer';
const initialState = {
    value: {
        "type": "resto",
        "name": "HR Resortssss",
        "defaultMenu": [
            { "name": "top10", "title": "Top 10" },
            { "name": "onGoing", "title": "On Going" },
            { "name": "goToMenu", "title": "Go To Menu" },
            { "name": "help", "title": "Help" }
        ],
        "categories": [
            {
                "name": "Orders",
                "icon": "Orders",
                "path": "/orders",
                "title": "Orders",
                "isActive": true,
                "default": true,
                "subcategories": [
                    {
                        "name": "Orders",
                        "title": "Orders",
                        "isActive": true,
                        "subMenu": [
                            {
                                "name": "vendorCode",
                                "title": "Vendor Code",
                                "isActive": true,
                                "type": "text",
                                "placeholder": "Enter Vendor Code"
                            },
                            {
                                "name": "vendorName",
                                "title": "Vendor Name",
                                "isActive": true,
                                "type": "text",
                                "placeholder": "Enter Vendor Name"
                            },
                            {
                                "name": "vendorEmail",
                                "title": "Vendor Email",
                                "isActive": true,
                                "type": "text",
                                "values": [],
                                "placeholder": "Enter Vendor Email"
                            },
                            {
                                "name": "vendorMobile",
                                "title": "Vendor Mobile",
                                "isActive": true,
                                "type": "text",
                                "values": ["Lawn", "Terrace"],
                                "placeholder": "Choose Vendor Location"
                            },

                            {
                                "name": "vendorAddr",
                                "title": "Vendor Address",
                                "isActive": true,
                                "type": "text",
                                "placeholder": "Enter Address"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "Masters",
                "icon": "Masters",
                "path": "/masters",
                "title": "Masters",
                "isActive": true,
                "default": true,
                "subcategories": [
                    {
                        "name": "menuMaster",
                        "title": "Menu",
                        "isActive": true,
                        "subMenu": []
                    },
                    {
                        "name": "itemMaster",
                        "title": "Items",
                        "isActive": true,
                        "subMenu": [
                            {
                                "name": "name",
                                "title": "Food Name",
                                "values": "",
                                "type": "Input",
                                "isActive": true,
                                "status": "default"
                            },
                            {
                                "name": "description",
                                "title": "Food Description",
                                "values": "",
                                "type": "Input",
                                "isActive": true,
                                "status": "custom"
                            },
                            {
                                "name": "measureUnit",
                                "title": "Units",
                                "type": "DropDown",
                                "values": ["Kg", "PC", "Unit"],
                                "isActive": true,
                                "status": "default"
                            },
                            {
                                "name": "price",
                                "title": "Price",
                                "type": "Input",
                                "values": "INR",
                                "default": ["INR", "Dollar"],
                                "isActive": true,
                                "status": "default"
                            },
                            {
                                "name": "category",
                                "title": "Category",
                                "type": "Input",
                                "values": "",
                                "default": ["Veg", "Non Veg"],
                                "isActive": true,
                                "status": "custom"
                            },
                            {
                                "name": "subCategory",
                                "title": "Sub Category",
                                "type": "Input",
                                "values": "",
                                "status": "custom",
                                "default": [
                                    {
                                        "name": "Starters",
                                        "category": "Veg",
                                        "values": ["Chinese", "Starters", "Main Course"]
                                    },
                                    {
                                        "name": "Starters",
                                        "category": "Non Veg",
                                        "values": ["Chinese", "Starters", "Main Course"]
                                    }
                                ],
                                "isActive": true
                            },
                            {
                                "name": "nutrition",
                                "title": "Nutritional Information",
                                "type": "Radio",
                                "values": "",
                                "status": "custom",
                                "isActive": false
                            }
                        ]
                    },
                    {
                        "name": "taxMaster",
                        "title": "Tax",
                        "isActive": true,
                        "subMenu": [
                            {
                                "name": "taxName",
                                "title": "Tax Name",
                                "type": "Input",
                                "values": "",
                                "isActive": true
                            }
                        ]
                    },
                    {
                        "name": "customerMaster",
                        "title": "Customers Master",
                        "isActive": true,
                        "subMenu": [
                            {
                                "name": "customerName",
                                "type": "Input",
                                "title": "Customer Name",
                                "values": "",
                                "isActive": true
                            },
                            {
                                "name": "customerMobile",
                                "title": "Customer Mobile",
                                "type": "Input",
                                "values": "",
                                "isActive": true
                            },
                            {
                                "name": "customerEmail",
                                "title": "Customer Email",
                                "type": "Input",
                                "values": "",
                                "isActive": true
                            },
                            {
                                "name": "customerLastVisit",
                                "title": "Customer Last Visit",
                                "type": "Input",
                                "values": "Date",
                                "isActive": true
                            },
                            {
                                "name": "customerAddr",
                                "title": "Customer Address",
                                "type": "Input",
                                "values": "Address String",
                                "isActive": true
                            },
                            {
                                "name": "customerHistory",
                                "title": "Customer History",
                                "values": [
                                    {
                                        "visitOn": "date",
                                        "type": "Input",
                                        "orderedItems": ["asas", "asdas", "asdasd"],
                                        "lastAmount": "200"
                                    }
                                ],
                                "isActive": true
                            }
                        ]
                    },
                    {
                        "name": "employeeMaster",
                        "title": "Employee Master",
                        "isActive": true,
                        "subMenu": [
                            {
                                "name": "employeeName",
                                "title": "Employee Name",
                                "type": "Input",
                                "values": "",
                                "isActive": true
                            },
                            {
                                "name": "employeeMobile",
                                "title": "Employee Mobile",
                                "type": "Input",
                                "values": "",
                                "isActive": true
                            },
                            {
                                "name": "employeeEmail",
                                "title": "Employee Email",
                                "type": "Input",
                                "values": "",
                                "isActive": true
                            },
                            {
                                "name": "employeeAddr",
                                "title": "Employee Address",
                                "type": "Input",
                                "values": "Address String",
                                "isActive": true
                            },
                            {
                                "name": "employeeHistory",
                                "title": "Employee History",
                                "values": [
                                    {
                                        "joining": "date",
                                        "type": "Input",
                                        "salaryDate": "Date",
                                        "salary": 200
                                    }
                                ],
                                "isActive": true
                            },
                            {
                                "name": "employeeVerification",
                                "title": "Employee Verification",
                                "values": [
                                    {
                                        "type": "Upload",
                                        "proofType": "Adhar",
                                        "proofDoc": "photo path"
                                    }
                                ],
                                "isActive": true
                            }
                        ]
                    }
                ]
            },
            {
                "name": "Items",
                "icon": "Items",
                "path": "/items",
                "title": "Foods",
                "isActive": true,
                "default": true,
                "subcategories": [
                    {
                        "name": "items",
                        "title": "Items",
                        "isActive": true,
                        "subMenu": [
                            {
                                "name": "itemCode",
                                "title": "Food Code",
                                "isActive": true,
                                "type": "text",
                                "placeholder": "Enter Food Code"
                            },
                            {
                                "name": "itemName",
                                "title": "Food Name",
                                "isActive": true,
                                "type": "text",
                                "placeholder": "Enter Food Name"
                            },
                            {
                                "name": "itemCategory",
                                "title": "Food Category",
                                "isActive": true,
                                "type": "DropDown",
                                "values": ["Naved", "Naik"],
                                "placeholder": "Choose Food Category"
                            },
                            {
                                "name": "itemSubCategory",
                                "title": "Food Sub Category",
                                "isActive": true,
                                "type": "DropDown",
                                "values": ["Naved", "Naik"],
                                "placeholder": "Choose Food Sub Category"
                            },
                            {
                                "name": "itemPrice",
                                "title": "Food Price",
                                "isActive": true,
                                "type": "text",
                                "placeholder": "Enter Food Price"
                            },
                            {
                                "name": "ingredients",
                                "title": "Ingredients",
                                "isActive": true,
                                "type": "DropDown",
                                "values": ["category one", "category 2"],
                                "placeholder": "Enter Food Ingredients"
                            },
                            {
                                "name": "recipe",
                                "title": "Food Recipe",
                                "isActive": true,
                                "type": "DropDown",
                                "values": ["category one", "category 2"],
                                "placeholder": "Enter Food Recipe"
                            },
                            {
                                "name": "allergen",
                                "title": "Allergen Information",
                                "isActive": true,
                                "type": "text",
                                "placeholder": "Something allergic to this food"
                            },
                            {
                                "name": "portionSize",
                                "title": "Portion Size",
                                "isActive": true,
                                "type": "text",
                                "placeholder": "How Many It Can Serve"
                            },
                            {
                                "name": "status",
                                "title": "Status",
                                "isActive": true,
                                "type": "text",
                                "placeholder": "Is It Available"
                            },
                            {
                                "name": "tax",
                                "title": "Taxable",
                                "isActive": true,
                                "type": "text",
                                "placeholder": "Enter Tax"
                            },
                            {
                                "name": "discount",
                                "title": "Discount",
                                "isActive": true,
                                "type": "text",
                                "placeholder": "Enter Discount"
                            },
                            {
                                "name": "images",
                                "title": "Images",
                                "isActive": true,
                                "value": [{}],
                                "type": "upload",
                                "placeholder": "Upload Pics"
                            },
                            {
                                "name": "currentStock",
                                "title": "Current Stock",
                                "isActive": true,
                                "type": "text",
                                "placeholder": "Items in stock"
                            },
                            {
                                "name": "barcode",
                                "title": "Bar Code",
                                "isActive": true,
                                "type": "text",
                                "placeholder": "Enter Barcode"
                            },
                            {
                                "name": "salesHistory",
                                "title": "Sales History",
                                "isActive": true,
                                "value": [{}]
                            },
                            {
                                "name": "customNotes",
                                "title": "Notes",
                                "isActive": true,
                                "type": "text",
                                "placeholder": "Enter more details"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "Tables",
                "icon": "Tables",
                "path": "/tables",
                "title": "Tables",
                "isActive": true,
                "default": true,
                "subcategories": [
                    {
                        "name": "tables",
                        "title": "Tables",
                        "isActive": true,
                        "subMenu": [
                            {
                                "name": "tableCode",
                                "title": "Table Code",
                                "isActive": true,
                                "type": "text",
                                "placeholder": "Enter Table Code"
                            },
                            {
                                "name": "tableName",
                                "title": "Table Name",
                                "isActive": true,
                                "type": "text",
                                "placeholder": "Enter Table Name"
                            },
                            {
                                "name": "tableStatus",
                                "title": "Table Status",
                                "isActive": true,
                                "type": "DropDown",
                                "values": ["Open", "Vaccant", "Closed", "Dirty"],
                                "placeholder": "Choose Table Status"
                            },
                            {
                                "name": "tablePlacement",
                                "title": "Table Placement",
                                "isActive": true,
                                "type": "DropDown",
                                "values": ["Lawn", "Terrace"],
                                "placeholder": "Choose Table Location"
                            },

                            {
                                "name": "tableQR",
                                "title": "Table QR",
                                "isActive": true,
                                "type": "text",
                                "placeholder": "Enter Table QR Code"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "Employees",
                "icon": "Employees",
                "path": "/employees",
                "title": "Employees",
                "isActive": true,
                "default": true,
                "subcategories": [
                    {
                        "name": "employeea",
                        "title": "Employees",
                        "isActive": true,
                        "subMenu": [
                            {
                                "name": "employeeCode",
                                "title": "Employee Code",
                                "isActive": true,
                                "type": "text",
                                "placeholder": "Enter Employee Code"
                            },
                            {
                                "name": "employeeName",
                                "title": "Employee Name",
                                "isActive": true,
                                "type": "text",
                                "placeholder": "Enter Employee Name"
                            },
                            {
                                "name": "employeeEmail",
                                "title": "Employee Email",
                                "isActive": true,
                                "type": "text",
                                "values": [],
                                "placeholder": "Enter Employeee Email"
                            },
                            {
                                "name": "employeeMobile",
                                "title": "Employee Mobile",
                                "isActive": true,
                                "type": "text",
                                "values": ["Lawn", "Terrace"],
                                "placeholder": "Choose Table Location"
                            },

                            {
                                "name": "employeeAddr",
                                "title": "Employee Address",
                                "isActive": true,
                                "type": "text",
                                "placeholder": "Enter Address"
                            },
                            {
                                "name": "employeeVerify",
                                "title": "Employee Verification",
                                "isActive": true,
                                "type": "upload",
                                "placeholder": "Choose ID Proofs"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "Vendors",
                "icon": "Vendors",
                "path": "/vendors",
                "title": "Vendors",
                "isActive": true,
                "default": true,
                "subcategories": [
                    {
                        "name": "vendors",
                        "title": "Vendors",
                        "isActive": true,
                        "subMenu": [
                            {
                                "name": "vendorCode",
                                "title": "Vendor Code",
                                "isActive": true,
                                "type": "text",
                                "placeholder": "Enter Vendor Code"
                            },
                            {
                                "name": "vendorName",
                                "title": "Vendor Name",
                                "isActive": true,
                                "type": "text",
                                "placeholder": "Enter Vendor Name"
                            },
                            {
                                "name": "vendorEmail",
                                "title": "Vendor Email",
                                "isActive": true,
                                "type": "text",
                                "values": [],
                                "placeholder": "Enter Vendor Email"
                            },
                            {
                                "name": "vendorMobile",
                                "title": "Vendor Mobile",
                                "isActive": true,
                                "type": "text",
                                "values": ["Lawn", "Terrace"],
                                "placeholder": "Choose Vendor Location"
                            },

                            {
                                "name": "vendorAddr",
                                "title": "Vendor Address",
                                "isActive": true,
                                "type": "text",
                                "placeholder": "Enter Address"
                            }
                        ]
                    }
                ]
            }
        ]
    },
}

export const businessSlice = createSlice({
    name: 'business',
    initialState,
    reducers: {
        updateBusiness: (state = initialState, actions) => {
            return {
                value: actions.payload,
            };
        },
        // updateLevelOne: (state = initialState, actions) => {
        //     const name = actions?.payload?.name
        //     const categories = state.value.categories
        //     categories.forEach((singleCat) => {
        //         if (singleCat.name === name) {
        //             singleCat.isActive = !singleCat.isActive;
        //             console.log(singleCat.name, "name")
        //             console.log(singleCat.isActive, "value")
        //         }
        //     })
        // },
        updateLevelOne: (state, action) => {
            const { name } = action.payload;

            const updatedCategories = state.value.categories.map(singleCat => {
                if (singleCat.name === name) {
                    // Create a new object for the updated category
                    return {
                        ...singleCat,
                        isActive: !singleCat.isActive,
                    };
                }
                return singleCat; // Return unchanged category
            });

            // Create a new state object with updated categories
            return {
                ...state,
                value: {
                    ...state.value,
                    categories: updatedCategories,
                },
            };
        },
        // updateLevelTwo: (state = initialState, actions) => {
        //     const name = actions?.payload?.name
        //     const categories = state.value.categories
        //     categories.forEach((singleCat) => {
        //         if (singleCat) {
        //             singleCat?.subcategories?.forEach((subcategory) => {
        //                 // subcategory?.subMenu?.forEach((item) => {
        //                 if (subcategory.name === name) {
        //                     subcategory.isActive = !subcategory.isActive;
        //                     console.log(subcategory.name, "name")
        //                     console.log(subcategory.isActive, "value")
        //                 }
        //                 // });
        //             });
        //         }
        //     })
        // },
        updateLevelTwo: (state, action) => {
            const { name } = action.payload;

            const updatedCategories = state.value.categories.map(singleCat => {
                if (singleCat && singleCat.subcategories) {
                    const updatedSubcategories = singleCat.subcategories.map(subcategory => {
                        if (subcategory.name === name) {
                            // Create a new object for the updated subcategory
                            return {
                                ...subcategory,
                                isActive: !subcategory.isActive,
                            };
                        }
                        return subcategory; // Return unchanged subcategory
                    });

                    // Create a new object for the category with updated subcategories
                    return {
                        ...singleCat,
                        subcategories: updatedSubcategories,
                    };
                }
                return singleCat; // Return unchanged category
            });

            // Create a new state object with updated categories
            return {
                ...state,
                value: {
                    ...state.value,
                    categories: updatedCategories,
                },
            };
        },
        // updateLevelThree: (state = initialState, actions) => {
        //     const name = actions?.payload?.name
        //     const categories = state.value.categories
        //     categories.forEach((singleCat) => {
        //         if (singleCat) {
        //             singleCat?.subcategories?.forEach((subcategory) => {
        //                 subcategory?.subMenu?.forEach((item) => {
        //                     if (item.name === name) {
        //                         item.isActive = !item.isActive;
        //                         console.log(item.name, "name")
        //                         console.log(item.isActive, "value")
        //                     }
        //                 });
        //             });
        //         }
        //     })
        // },
        updateLevelThree: (state, action) => {
            const { name } = action.payload;

            const updatedCategories = state.value.categories.map(singleCat => {
                if (singleCat && singleCat.subcategories) {
                    const updatedSubcategories = singleCat.subcategories.map(subcategory => {
                        if (subcategory && subcategory.subMenu) {
                            const updatedSubMenu = subcategory.subMenu.map(item => {
                                if (item.name === name) {
                                    // Create a new object for the updated item
                                    return {
                                        ...item,
                                        isActive: !item.isActive,
                                    };
                                }
                                return item; // Return unchanged item
                            });

                            // Create a new object for the subcategory with updated subMenu
                            return {
                                ...subcategory,
                                subMenu: updatedSubMenu,
                            };
                        }
                        return subcategory; // Return unchanged subcategory
                    });

                    // Create a new object for the category with updated subcategories
                    return {
                        ...singleCat,
                        subcategories: updatedSubcategories,
                    };
                }
                return singleCat; // Return unchanged category
            });

            // Create a new state object with updated categories
            return {
                ...state,
                value: {
                    ...state.value,
                    categories: updatedCategories,
                },
            };
        },
    },
})

export const { updateBusiness, updateLevelOne, updateLevelTwo, updateLevelThree } = businessSlice.actions

export default businessSlice.reducer
