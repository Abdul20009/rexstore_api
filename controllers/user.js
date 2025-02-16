const Banner = require("../models/banner");
const Category = require("../models/category");
const SubCategory = require("../models/sub_category");
const Product = require("../models/product");
const ProductReview = require("../models/product_review");

const bannerController = async (req, res) => {
  try {
    const { image } = req.body;
    const banner = new Banner({ image });
    await banner.save();
    return res.status(201).send(banner);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const getBanner = async (req, res) => {
  try {
    const banners = await Banner.find();

    // Remove newline characters from each banner's image field
    const cleanedBanners = banners.map((banner) => ({
      ...banner._doc,
      image: banner.image.replace(/\n/g, "").trim(), // Remove '\n' and trim spaces
    }));

    return res.status(200).json(cleanedBanners);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};


const categoryController = async (req, res) => {
  try {
    const { name, image, banner } = req.body;
    const category = new Category({ name, image, banner });
    await category.save();
    return res.status(201).send(category);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await Category.find();
    return res.status(200).send(category);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const subCategoryController = async (req, res) => {
  try {
    const { categoryId, categoryName, image, subCategory } = req.body;
    const subcategory = new SubCategory({
      categoryId,
      categoryName,
      image,
      subCategory,
    });
    await subcategory.save();
    return res.status(201).send(subcategory);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const getAllSubCategory = async (req, res) => {
  try {
    const sub_category = await SubCategory.find();
    return res.status(200).send(sub_category);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const getSub_category = async (req, res) => {
  try {
    const { categoryName } = req.params;
    const subcategories = await subCategory.find({
      categoryName: categoryName,
    });
    if (!subcategories || subcategories.length == 0) {
      return res.status(404).json({ msg: "subcategories not found" });
    } else {
      return res.status(200).json(subcategories);
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const addProductController = async (req, res) => {
  try {
    const {
      productName,
      productPrice,
      quantity,
      description,
      category,
      subCategory,
      images,
    } = req.body;
    const product = new Product({
      productName,
      productPrice,
      quantity,
      description,
      category,
      subCategory,
      images,
    });
    await product.save();
    return res.status(201).send(product);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const poularProductController = async (req, res) => {
  try {
    const product = await Product.find({ popular: true });
    if (!product || product.length == 0) {
      return res.status(404).json({ msg: "product not found" });
    } else {
      return res.status(200).json(product);
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const recommendedProductController = async (req, res) => {
    try {
      const product = await Product.find({ recommend: true });
      if (!product || product.length == 0) {
        return res.status(404).json({ msg: "recommend not found" });
      } else {
        return res.status(200).json(product);
      }
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  };

  const productReviewController = async (req, res) => {
    try {
      const {
        buyerId, email, fullName, productId, rating, review,
      } = req.body;
      const reviews = new ProductReview({
        buyerId, email, fullName, productId, rating, review,
      });
      await reviews.save();
      return res.status(201).send(reviews);
    } catch (e) {
      return res.status(500).json({ error:e.message });
    }
  };

  const getProductReviewController = async (req, res) => {
    try {
      const reviews = await ProductReview.find();
      return res.status(200).send(reviews);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  };
  
module.exports = {
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
  getProductReviewController
};
