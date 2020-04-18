import React from 'react';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';

import Container from '../components/atoms/Container';
import Post from '../components/molecules/Post';
import SEO from '../components/molecules/Seo';

const Portfolio = ({ data }: any) => {
  const posts = data.allContentfulItem.edges;

  return (
    <>
      <SEO title="Portfolio" />
      <Container>
        <h2>
          Portfolio<span className="accent">.</span>
        </h2>
        <Grid>
          {posts.map(({ node: { title, slug, image, type } }: any) => (
            <Post data={{ title, slug, image, type }} key={slug} />
          ))}
        </Grid>
        <Centered>
          This is a small selection of the hundreds of projects I worked on.
          <br />
          Want to see more?{' '}
          <Link to="/contact/">
            <strong>Get in touch</strong>
          </Link>{' '}
          and let me know what you're looking for, so I can send you a more
          comprehensive portfolio.
        </Centered>
      </Container>
    </>
  );
};

export default Portfolio;

const Centered = styled.p`
  margin-top: 2rem;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;

  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulItem(sort: { fields: sortOrder, order: ASC }) {
      edges {
        node {
          title
          slug
          client
          type
          image: featured_image {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`;
