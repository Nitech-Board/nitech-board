"use client";

export default function ClassDetails() {
  const details = {
    title: "gohr",
    instructor: "hage",
    code: "2345",
    location: "5211",
  };

  return (
    <section className="class-details">
      <div className="class-details-header">基本情報</div>
      <div className="class-details-content">
        <table>
          <tbody>
            <tr>
              <td>授業名</td>
              <td>{details.title}</td>
            </tr>
            <tr>
              <td>教員</td>
              <td>{details.instructor}</td>
            </tr>
            <tr>
              <td>講義コード</td>
              <td>{details.code}</td>
            </tr>
            <tr>
              <td>開講場所</td>
              <td>{details.location}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
