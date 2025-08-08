import React from 'react';

// Define interfaces for type safety
interface BlogPost {
  authorName: string;
  authorImage: string;
  date: string;
  title: string;
  image: string;
}

// BlogCard Component
function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div
      className="bg-[#DDD6FF] h-[459px] relative p-6 flex flex-col
                 rounded-lg shadow-xl transition-transform duration-300 ease-out hover:scale-[1.02]
                 group cursor-pointer"
    >
      {/* Image Area */}
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-64 object-cover mb-6 rounded-md
                   transition-transform duration-300 ease-out group-hover:scale-105"
      />

      {/* Author and Meta Info */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={post.authorImage}
          alt={post.authorName}
          className="w-11 h-10 rounded-full flex-shrink-0 object-cover
                     border-2 border-white transition-transform duration-200 ease-out group-hover:rotate-6"
        />
        <div className="flex-1">
          {/* Author name */}
          <p className="text-gray-900 text-base font-semibold font-source-sans-pro">
            {post.authorName}
          </p>
          {/* Date */}
          <p className="text-gray-700 text-sm font-source-sans-pro">
            {post.date}
          </p>
        </div>
      </div>

      {/* Content Preview */}
      <h3 className="text-gray-900 text-lg font-bold font-playfair-display">
        {post.title}
      </h3>
    </div>
  );
}

// Main BlogsAndNews Component
export default function BlogsAndNews() {
  const blogPosts: BlogPost[] = [
    {
      authorName: "Doctor Arvind V Reddy",
      authorImage: "/reddy.jpg",
      date: "July 28, 2025",
      title: "Dr. Priyanka Das Joins WWE as National Official Physiotherapist",
      image: "/Blog1.jpg",
    },
    {
      authorName: "Deccan Chronicle",
      authorImage: "/auth2.png",
      date: "Oct 21, 2024",
      title: "Rakul Preet Singh, suffered a serious back injury while performing an 80-kg deadlift without proper precautions.",
      image: "/Blog2.jpg",
    },
    {
      authorName: "Chandni Kumar Mehra",
      authorImage: "/auth3.jpg",
      date: "July 22, 2025",
      title: "Sustainable Living: Tips for a Greener Home",
      image: "/Blog3.jpg",
    },
  ];

  const featuredBlogPost: BlogPost = {
    authorName: "Wohl Physio",
    authorImage: "/doe.jpg",
    date: "August 8, 2018",
    title: "Role of Physiotherapy in Fitness",
    image: "/blog4.png",
  };

  return (
    <section className="bg-black py-16 lg:py-24 px-4 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Centered Heading */}
        <h2
          className="text-[white] text-3xl lg:text-5xl font-bold text-center mb-12 lg:mb-16
                     font-playfair font-bold text-white text-4xl lg:text-7xl mb-"
        >
          Blogs and News
        </h2>
        {/* Featured Blog Post */}
        <div className="mb-12 lg:mb-16">
          <div
            className="bg-[#DDD6FF] h-96 lg:h-[605px] relative overflow-hidden
                       rounded-lg shadow-2xl transition-transform duration-500 ease-in-out hover:scale-[1.01]
                       group"
          >
            {/* Main featured image area */}
            <div className="absolute inset-4 lg:inset-8 flex flex-col">
              <img
                src={featuredBlogPost.image}
                alt={featuredBlogPost.title}
                className="w-full h-4/6 object-cover mb-6 rounded-md
                           transition-transform duration-500 ease-in-out group-hover:scale-105"
              />

              {/* Author info and content area */}
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={featuredBlogPost.authorImage}
                  alt={featuredBlogPost.authorName}
                  className="w-20 h-20 lg:w-24 lg:h-24 rounded-full flex-shrink-0 object-cover
                             border-4 border-white transition-transform duration-300 ease-out group-hover:rotate-3"
                />
                <div className="flex-1">
                  <p className="text-gray-900 text-lg lg:text-xl font-semibold mb-1 font-source-sans-pro">
                    {featuredBlogPost.authorName}
                  </p>
                  <p className="text-gray-700 text-sm lg:text-base font-source-sans-pro">
                    {featuredBlogPost.date}
                  </p>
                </div>
              </div>

              {/* Title/content placeholder */}
              <h3 className="text-gray-900 text-xl lg:text-3xl font-bold font-playfair-display">
                {featuredBlogPost.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Three Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard key={index} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
