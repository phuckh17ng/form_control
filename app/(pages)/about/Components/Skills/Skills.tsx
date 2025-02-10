import React from "react";

const Skills = () => {
  const list = [
    {
      type: "Work",
      title: "Software Developer",
      company: "NEC Vietnam",
      duration: "Now",
      description:
        "Responsible for developing, maintaining, and enhancing NEC's software products for various industries such as electronics, automotive, and home entertainment.",
    },
    {
      type: "Certificate",
      title: "Scrum Master I",
      company: "Scrum.org",
      duration: "2024",
      description:
        "Responsible for developing, maintaining, and enhancing NEC's software products for various industries such as electronics, automotive, and home entertainment.",
    },
    {
      type: "Work",
      title: "Software Developer Intern",
      company: "NEC Vietnam",
      duration: "2023",
      description:
        "Responsible for developing, maintaining, and enhancing NEC's software products for various industries such as electronics, automotive, and home entertainment.",
    },
    {
      type: "Work",
      title: "Backend Developer Intern",
      company: "FPT Software",
      duration: "2022",
      description:
        "Responsible for developing, maintaining, and enhancing NEC's software products for various industries such as electronics, automotive, and home entertainment.",
    },
  ];
  return (
    <section className="py-24 w-full h-full">
      <div className="grid grid-cols-12 pt-24">
        <div className="col-span-4 col-start-2 text-start text-4xl tracking-widest mb-24 border-l-4 pl-4 border-[#eb5930]">
          Work Experiences, Certificates & Awards
        </div>
        {list.map((item, index) => {
          return (
            <div
              key={index}
              className="col-start-2 col-span-10 flex justify-between border-b border-border pt-12 pb-20 items-center"
            >
              <div className="w-1/3 text-4xl max-lg:text-xl uppercase font-semibold">
                {item.type}
              </div>
              <div className="w-1/3 relative">
                <p className="text-4xl font-semibold max-lg:text-xl">
                  {item.title}
                </p>
                <p className="mt-2 max-lg:text-sm absolute -bottom-8">
                  {item.company}
                </p>
              </div>
              <div className="w-1/3 text-end font-semibold text-4xl max-lg:text-xl">
                {item.duration}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
