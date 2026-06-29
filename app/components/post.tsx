
import * as sanitizeHtml from 'sanitize-html'
export default function Post() {
  return (
    <div>
      <h1>Post</h1>
      {sanitizeHtml.default('<h1>Hello World</h1>')}
    </div>
  );
} 