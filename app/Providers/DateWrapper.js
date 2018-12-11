const monthNames = [
  { abbr: "jan", fill: "January" },
  { abbr: "feb", full: "February" },
  { abbr: "mar", full: "March" },
  { abbr: "apr", full: "April" },
  { abbr: "may", full: "May" },
  { abbr: "jun", full: "June" },
  { abbr: "jul", full: "July" },
  { abbr: "aug", full: "August" },
  { abbr: "sep", full: "September" },
  { abbr: "oct", full: "October" },
  { abbr: "nov", full: "November" },
  { abbr: "dec", full: "December" }
];

export const newsDateConverter = date => {
  const d = new Date(date);
  return `${monthNames[d.getMonth()].full} ${d.getDate()}, ${d.getFullYear()} `;
};

const lessThenTen = v => (parseInt(v, 10) < 10 ? `0${v}` : v.toString());

export const dateToRedeble = date => {
  const d = new Date(date);
  return `${lessThenTen(d.getHours())}:${lessThenTen(
    d.getMinutes()
  )},  ${d.getDate()} ${monthNames[d.getMonth()].abbr} ${d.getFullYear()} `;
};
