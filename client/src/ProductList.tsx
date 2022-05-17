import React from 'react';

import { Category, Article } from './types';
import './ProductList.css';

var intlNumberFormatValues = ['en-US', 'currency', 'LKR'];

export var formatter = new Intl.NumberFormat(intlNumberFormatValues[0], {
  style: intlNumberFormatValues[1],
  currency: intlNumberFormatValues[2],
});

type State = {
  categories: Category[];
};

export var ArticleCard = ({ article }: { article: Article }) => {
  return (
    <div className={'article'}>
      <img src={article.images[0].path} />
      <div>{article.name}</div>
      <div>{formatter.format(article.prices.value / 100)}</div>
      <section role="button">Add to cart</section>
    </div>
  )
};

class ArticleList extends React.Component {
  state: State = {
    categories: [],
  };

  componentDidMount() {
    var xhr = new XMLHttpRequest();

    xhr.open('POST', '/graphql');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify({
      query: `{
        categories {
          name
          articleCount
          childCategories {
            name
            urlPath
          }
          articles {
              name
              variantName
              prices {
                currency
                value
              }
              images {
                path
              }
          }
        }
      }`,
    }));

    xhr.onload = () => {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.response);

        this.setState({ categories: response.data.categories });
      }
    }
  }

  render() {
    var articles = this.state.categories.map((category) => {
      return category.articles.map((article) => {
        return <ArticleCard article={article} />;
      });
    });

    return (
      <div className={'page'}>
        <div className={'header'}>
          <strong>SHINE INT</strong>
          <input placeholder={'Search'} />
        </div>

        <div className={'sidebar'}>
          <h3>Categories</h3>
          {this.state.categories.length ? (
            <ul>
              {this.state.categories[0].childCategories.map(({ name, urlPath }) => {
                return (
                  <li>
                    <a href={`/${urlPath}`}>{name}</a>
                  </li>
                );
              })}
            </ul>
          ) : (
            'Loading...'
          )}
        </div>

        <div className={'content'}>
          {this.state.categories.length ? (
            <h1>
              {this.state.categories[0].name}
              <small> ({this.state.categories[0].articleCount})</small>
            </h1>
          ) : (
            'Loading...'
          )}
          <div className={'articles'}>{articles}</div>
        </div>

        <div className={'footer'}>
          All Prices are in Sri Lankan rupees
        </div>
      </div>
    );
  }
}

var PLP = () => {
  return <ArticleList />;
};

export default PLP;
