export default function EducationSection() {
  return (
    <section id="education">
      <div className="wrap">
        <div className="section-header-row">
          <span className="section-badge">II</span>
          <h2 className="section-header">EDUCATION</h2>
        </div>

        <hr className="gold-rule" />

        <div className="chronicle-card ornamental-corners education-card">
          <div>
            <p className="field-label">University of Kansas · Lawrence, Kansas</p>
            <h3>Bachelor of Science in Computer Science</h3>
            <p className="body-text education-meta">
              Expected May 2028 <span aria-hidden="true">·</span> GPA: 3.96
            </p>
          </div>

          <div className="education-details">
            <div>
              <p className="field-label">Coursework</p>
              <p className="body-text">
                Data Structures &amp; Algorithms, Embedded Systems, Database
                Systems, and Software Engineering
              </p>
            </div>
            <div>
              <p className="field-label">Honors</p>
              <p className="body-text">
                Upsilon Pi Epsilon, University Honors Program, Dean&rsquo;s
                List, Kansas Governor&rsquo;s Scholar, and Hixson Scholar
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
