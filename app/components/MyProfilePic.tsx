import React from "react";
import Image from "next/image";
import img from "../../public/pictures/profile-photo-600x600.png";

export default function MyProfilePic() {
  return (
    <section className="w-full mx-auto">
      <Image
        className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
        src={img}
        width={200}
        height={200}
        alt="Dave Gray"
        priority={true}
      />
    </section>
  );
}
