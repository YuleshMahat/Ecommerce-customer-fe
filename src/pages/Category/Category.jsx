import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCategoryProductsAction } from "../../features/category/categoryAction";
import CustomCard from "../../components/customCard/CustomCard";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";

const Category = () => {
  const { subCategory } = useParams();
  const [view, setView] = useState("grid");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const result = await fetchCategoryProductsAction(subCategory);
      setProducts(result.products);
    };
    getProducts();
  }, [subCategory]);

  return (
    <main className="flex-grow-1 d-flex flex-column">
      <section className="py-3 hero-wrap flex-grow-1">
        <Container className="d-flex flex-column flex-grow-1">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold text-capitalize text-white">
              {subCategory}
            </h2>
            <ToggleButtonGroup
              type="radio"
              name="viewOptions"
              value={view}
              onChange={(val) => setView(val)}
            >
              <ToggleButton
                id="grid-view"
                value="grid"
                variant="outline-primary"
              >
                Grid
              </ToggleButton>
              <ToggleButton
                id="list-view"
                value="list"
                variant="outline-primary"
              >
                List
              </ToggleButton>
            </ToggleButtonGroup>
          </div>

          {/* No Products */}
          {products?.length === 0 && (
            <p className="text-center text-muted flex-grow-1">
              No products found.
            </p>
          )}

          {/* Grid View */}
          {view === "grid" && products?.length > 0 && (
            <Row className="g-4 flex-grow-1">
              {products.map((p) => (
                <Col xs={12} sm={6} md={4} lg={3} key={p._id}>
                  <CustomCard product={p} />
                </Col>
              ))}
            </Row>
          )}

          {/* List View */}
          {view === "list" && products?.length > 0 && (
            <div className="d-flex flex-column gap-3 flex-grow-1">
              {products.map((p) => (
                <Card key={p._id} className="shadow-sm border-0">
                  <Card.Body className="d-flex align-items-center">
                    <img
                      src={p.images[0] || "/placeholder.jpg"}
                      alt={p.name}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        marginRight: "20px",
                        borderRadius: "10px",
                      }}
                    />
                    <div className="flex-grow-1">
                      <Card.Title>{p.name}</Card.Title>
                      <Card.Text>${p.price}</Card.Text>
                    </div>
                    <Button
                      size="lg"
                      bsPrefix="neo"
                      className="btn-neo rounded-4 px-4 d-inline-flex align-items-center gap-2"
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </section>
    </main>
  );
};

export default Category;
