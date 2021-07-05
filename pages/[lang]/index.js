import { useRouter } from 'next/router';
import { getPagesURLs, getLangMainPage, getLanguages } from '../../lib/db';
import { ContentPage } from '../../src/ContentPage';

// Index page for any language
export default function Page(props) {
    const router = useRouter();
    const { lang } = router.query;

    return <ContentPage lang={lang} {...props} />;
}

export async function getServerSideProps(context) {
    const languages = await getLanguages();
    if (!languages.find((l) => l.id === context.params.lang)) {
        // redirect to english if language is not found
        context.res.setHeader('location', `/`);
        context.res.statusCode = 302;
        context.res.end();
    }

    return {
        props: {
            pages: await getPagesURLs(context.params.lang),
            content: await getLangMainPage(context.params.lang),
            languages
        }
    };
}
