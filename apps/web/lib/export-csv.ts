export function exportFormSubmissionsToCSV(
  form: any,
  submissions: any[]
) {
  if (!form || !submissions?.length) {
    alert("No submissions to export");
    return;
  }

  // CSV headers
  const headers = [
    "Submitted At",
    ...form.fields.map((field: any) => field.label),
  ];

  // rows
  const rows = submissions.map((submission) => {
    const valuesMap = new Map(
      (submission.values || []).map((v: any) => [
        v.formFieldId,
        v.value,
      ])
    );

    return [
      submission.createdAt
        ? new Date(submission.createdAt).toLocaleString()
        : "",
      ...form.fields.map(
        (field: any) => valuesMap.get(field.id) || ""
      ),
    ];
  });

  const csvContent = [headers, ...rows]
    .map((row) =>
      row
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    `${form.title || "form-submissions"}.csv`
  );

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}