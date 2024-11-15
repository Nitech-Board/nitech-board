// // src/components/Search/SearchResults.js

// import Link from "next/link";

// export const SearchResults = ({ results }) => {
//   return (
//     <div style={{ marginTop: "20px" }}>
//       <p>検索結果</p>
//       <ul>
//         {results.map((result, index) => (
//           <li key={index}>
//             <Link href={`/class-detail/${result.num}`}>
//               {result.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// src/components/Search/SearchResults.js

// src/components/Search/SearchResults.js

import Link from 'next/link';

export const SearchResults = ({ results }) => {
  if (results.length === 0) {
    return <p>検索結果がありません。</p>;
  }

  return (
    <ul>
      {results.map((result, index) => (
        <li key={index}>
          {/* Linkを使用して動的ルートに遷移 */}
          <Link href={`/class-detail/${result.num}`}>
            {result.num}: {result.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
