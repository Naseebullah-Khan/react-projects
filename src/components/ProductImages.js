import React, { useState } from "react";
import styled from "styled-components";

const ProductImages = (props = {}) => {
  const image = Object.values(props);
  if (image.length < 1) {
    image.push({ url: "" });
  }

  const [mainImage, setMainImage] = useState(image[0]);

  return (
    <Wrapper>
      <img src={mainImage.url} alt={mainImage.filename} className="main" />
      <div className="gallery">
        {image.map((image, index) => {
          const { url, filename } = image;
          return (
            <img
              key={index}
              src={url}
              alt={filename}
              className={url === mainImage.url ? "active" : undefined}
              onClick={() => setMainImage(image[index])}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default ProductImages;
