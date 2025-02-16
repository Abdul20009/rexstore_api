const express = require("express");
const router = express.Router();

const {
  bannerController,
  getBanner,
  categoryController,
  getCategory,
  subCategoryController,
  getAllSubCategory,
  getSub_category,                              
  addProductController,
  poularProductController,
  recommendedProductController,
  productReviewController,
  getProductReviewController,
} = require("../controllers/user");

router.post("/banner", bannerController);
router.get("/banner", getBanner);
router.post("/categories", categoryController);
router.get("/categories", getCategory);
router.post("/subcategories", subCategoryController);
router.get("/getAllSubCategory", getAllSubCategory);
router.get("/category/:categoryName/subcategories", getSub_category);
router.post("/add-product", addProductController);
router.get("/popular-products", poularProductController);
router.get("/recommended-products", recommendedProductController);
router.post("/product-review", productReviewController);
router.get("/reviews", getProductReviewController);

module.exports = router;