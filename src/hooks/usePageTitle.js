import { useEffect } from 'react'

const usePageTitle = (title) => {
    useEffect(() => {
        const prev = document.title
        document.title = title ? `${title} | CampusVerse` : 'CampusVerse — Connect with College Students'
        return () => { document.title = prev }
    }, [title])
}

export default usePageTitle
