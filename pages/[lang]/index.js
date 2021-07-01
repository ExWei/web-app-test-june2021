import { useRouter } from 'next/router';
import { getPagesURLs, getPage } from '../../lib/db';
import { ContentPage } from '../../src/ContentPage';

// Index page for any language
export default function Page(props) {
    const router = useRouter();
    const { lang } = router.query;

    return <ContentPage lang={lang} {...props} />;
}

export async function getServerSideProps(context) {
    return {
        props: {
            pages: await getPagesURLs(context.params.lang),
            content: await getPage('index')
        }
    };
}
