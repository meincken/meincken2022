import React from "react";
import format from "date-fns/format";

export default class PostPreview extends React.Component {
  render() {
    const {entry, widgetFor, getAsset} = this.props;
    let image = getAsset(entry.getIn(["data", "image"]));

    return <main>
      <h1>{ entry.getIn(["data", "title"])}</h1>
      <div>
        <p>{ format(entry.getIn(["data", "date"]), "iii, MMM d, yyyy") }</p>
        <p>Read in x minutes</p>
      </div>
      <div>
        <p>{ entry.getIn(["data", "description"]) }</p>
        { image && <img src={ image } alt={ entry.getIn(["data", "title"])} /> }
        { widgetFor("body") }
      </div>
    </main>;
  }
}
