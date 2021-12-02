import useStore from '@/store/main.store'
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react'
import { ProjectCard } from './Cards'
import { Filter } from './Filter'
import { Hiring } from './Hiring'

const MAX_ITEMS = 12

export const AllProjects = () => {
  const { projects } = useStore(state => state)

  // Pagination
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    if (projects.length > MAX_ITEMS) {
      const endOffset = itemOffset + MAX_ITEMS;

      setCurrentItems(projects.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(projects.length / MAX_ITEMS));
    } else {
      setCurrentItems(projects);
    }
  }, [itemOffset, projects]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * MAX_ITEMS) % projects.length;
    setItemOffset(newOffset);
  };

  return <div className=" relative mx-auto w-full flex-grow">
    <div className="absolute min-w-full h-72 bg-secondary-dark grid grid-flow-col ">
      <div className="w-full h-full" style={{ backgroundImage: `url('./road.png')` }}>
      </div>
      <div className="text-white text-2xl font-bold mt-10 ml-6">
        All projects
      </div>
    </div>
    <div className="relative mx-auto w-11/12 2xl:w-3/4 mt-4 ">
      <div className="flex flex-col bg-white mt-28 gap-4 p-8">
        <div className='border-b-2 border-secondary-light py-4'>
          <span className='text-2xl font-medium'>Projects list</span>
        </div>
        <div className="flex flex-col md:flex-row gap-8 mt-6  pb-10 border-b-[20px] border-secondary-dark">
          {/* Sidebar */}
          <Filter />

          {/* Project listeing  */}
          <div className="flex flex-col gap-10 md:w-10/12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {currentItems && currentItems
                .map(project => <ProjectCard key={String(project.name).toLocaleLowerCase()} {...project} />)
              }
            </div>

            <div className="flex self-center mt-10">
              {projects.length > MAX_ITEMS && <ReactPaginate
                breakLabel="..."
                className='flex gap-4 font-regular'
                activeClassName='bg-secondary-dark text-white px-2 rounded-sm'
                nextLabel="Next"
                onPageChange={handlePageClick}
                // pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="Prev"
                marginPagesDisplayed={2}
                renderOnZeroPageCount={null}
                forcePage={0}
              />}
            </div>
          </div>
        </div>
        <Hiring />
      </div>
    </div>
  </div >
}
