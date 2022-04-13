"use strict";
const express = require("express");
const router = express.Router();
const { Client } = require("@elastic/elasticsearch");
const bodyParser = require("body-parser").json();

const elasticClient = new Client({
  node: "https://localhost:9200",
  auth: {
    username: "elastic",
    password: "l_MwYmJnTp*iT2FfDRR+",
  },
});

router.use((req, res, next) => {
  elasticClient
    .index({
      index: "logs",
      body: {
        url: req.url,
        method: req.method,
      },
    })
    .then((res) => {
      console.log("Logs indexed");
    })
    .catch((err) => {
      console.log(err);
    });
  next();
});

router.post("/products", bodyParser, (req, res) => {
  elasticClient
    .index({
      index: "products",
      body: req.body,
    })
    .then((resp) => {
      return res.status(200).json({
        msg: "product indexed",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        msg: "Error",
        err,
      });
    });
});

router.get("/products/:id", (req, res) => {
  let query = {
    index: "products",
    id: req.params.id,
  };
  elasticClient
    .get(query)
    .then((resp) => {
      if (!resp) {
        return res.status(404).json({
          product: resp,
        });
      }
      return res.status(200).json({
        product: resp,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        msg: "Error not found",
        err,
      });
    });
});

router.put("/products/:id", bodyParser, (req, res) => {
  elasticClient
    .update({
      index: "products",
      id: req.params.id,
      body: {
        doc: req.body,
      },
    })
    .then((resp) => {
      return res.status(200).json({
        msg: "product updated",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        msg: "Error",
        err,
      });
    });
});

router.delete("/products/:id", (req, res) => {
  elasticClient
    .delete({
      index: "products",
      id: req.params.id,
    })
    .then((resp) => {
      res.status(200).json({
        msg: "Product deleted",
      });
    })
    .catch((err) => {
      res.status(404).json({
        msg: "Error",
      });
    });
});

router.get("/products", (req, res) => {
  let query = {
    index: "products",
  };
  if (req.query.product) query.q = `*${req.query.product}*`;
  elasticClient
    .search(query)
    .then((resp) => {
      return res.status(200).json({
        products: resp.hits.hits,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        msg: "Error",
        err,
      });
    });
});

router.get("/users", (req, res) => {
  let query = {
    index: "users",
  };
  if (req.query.users) query.q = `*${req.query.users}*`;
  elasticClient
    .search(query)
    .then((resp) => {
      return res.status(200).json({
        users: resp.hits.hits,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        msg: "Error",
        err,
      });
    });
});

// router.get("/kibana_sample_data_ecommerce", (req, res) => {
//   let query = {
//     index: "kibana_sample_data_ecommerce",
//   };
//   if (req.query.kibana_sample_data_ecommerce)
//     query.q = `*${req.query.kibana_sample_data_ecommerce}*`;
//   elasticClient
//     .search(query)
//     .then((resp) => {
//       return res.status(200).json({
//         kibana_sample_data_ecommerce: resp.hits.hits,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       return res.status(500).json({
//         msg: "Error",
//         err,
//       });
//     });
// });

router.post("/kibana_sample_data_ecommerce", (req, res) => {
  let offset = req.body.offset;
  delete req.body.offset;

  let elasticQuery = {
    index: "kibana_sample_data_ecommerce",
    query: {
      match: {
        ...req.body,
      },
    },
  };

  console.log(elasticQuery);

  if (req.query.kibana_sample_data_ecommerce)
    query.q = `*${req.query.kibana_sample_data_ecommerce}*`;
  elasticClient
    .search(elasticQuery)
    .then((resp) => {
      let noOfOrders = Object.keys(resp.hits.hits).length;
      let ordersResponse;
      if(offset==undefined || offset>=noOfOrders){
          ordersResponse = resp.hits.hits;
      }
      else{
          ordersResponse = resp.hits.hits.slice(0,offset);
      }
      return res.status(200).json({
        kibana_sample_data_ecommerce: ordersResponse,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        msg: "Error",
        err,
      });
    });
});

module.exports = router;
