import { blogs } from '@/.velite'
import { MDXContentRenderer } from '@/components/frontend/docs/mdx/mdx-content-renderer'
import { Navbar } from '@/components/frontend/docs/nav-bar'
import { Sidebar } from '@/components/frontend/docs/side-bar'

export default function BlogPage() {
  const sortedBlogs = [...blogs]
    .filter(b => b.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const blog = sortedBlogs[0]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 md:p-10 prose prose-invert max-w-4xl mx-auto">
          {blog && <MDXContentRenderer code={blog.code} />}
        </main>
      </div>
    </div>
  )
}
