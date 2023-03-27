--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE library;
--
-- Name: library; Type: DATABASE; Schema: -; Owner: aakashmangla
--

CREATE DATABASE library WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = icu LOCALE = 'en_US.UTF-8' ICU_LOCALE = 'en-US';


ALTER DATABASE library OWNER TO aakashmangla;

\connect library

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: authors; Type: TABLE; Schema: public; Owner: aakashmangla
--

CREATE TABLE public.authors (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.authors OWNER TO aakashmangla;

--
-- Name: authors_id_seq; Type: SEQUENCE; Schema: public; Owner: aakashmangla
--

CREATE SEQUENCE public.authors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.authors_id_seq OWNER TO aakashmangla;

--
-- Name: authors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aakashmangla
--

ALTER SEQUENCE public.authors_id_seq OWNED BY public.authors.id;


--
-- Name: books; Type: TABLE; Schema: public; Owner: aakashmangla
--

CREATE TABLE public.books (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    details character varying(300) NOT NULL,
    time_to_read integer NOT NULL,
    book_cover_filename text,
    book_pdf_filename text
);


ALTER TABLE public.books OWNER TO aakashmangla;

--
-- Name: books_authors; Type: TABLE; Schema: public; Owner: aakashmangla
--

CREATE TABLE public.books_authors (
    book_id integer NOT NULL,
    author_id integer NOT NULL
);


ALTER TABLE public.books_authors OWNER TO aakashmangla;

--
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: aakashmangla
--

CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.books_id_seq OWNER TO aakashmangla;

--
-- Name: books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aakashmangla
--

ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;


--
-- Name: authors id; Type: DEFAULT; Schema: public; Owner: aakashmangla
--

ALTER TABLE ONLY public.authors ALTER COLUMN id SET DEFAULT nextval('public.authors_id_seq'::regclass);


--
-- Name: books id; Type: DEFAULT; Schema: public; Owner: aakashmangla
--

ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);


--
-- Data for Name: authors; Type: TABLE DATA; Schema: public; Owner: aakashmangla
--

INSERT INTO public.authors VALUES (30, 'Chinua Achebe');
INSERT INTO public.authors VALUES (31, 'Dante Alighieri');
INSERT INTO public.authors VALUES (32, 'Samuel Beckett');
INSERT INTO public.authors VALUES (33, 'Jorge Luis Borges');
INSERT INTO public.authors VALUES (34, 'Denis Diderot');
INSERT INTO public.authors VALUES (35, 'Johann Wolfgang von Goethe');
INSERT INTO public.authors VALUES (36, 'Tayeb Salih');
INSERT INTO public.authors VALUES (37, 'William Shakespeare');
INSERT INTO public.authors VALUES (39, 'Sophocles');
INSERT INTO public.authors VALUES (40, 'Albert Camus');


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: aakashmangla
--

INSERT INTO public.books VALUES (25, 'Things Fall Apart', 'Things Fall Apart is the debut novel by Nigerian author Chinua Achebe, first published in 1958. It depicts pre-colonial life in the southeastern part of Nigeria and the invasion by Europeans during the late 19th century.', 418, 'cover-1679849493985.jpg', 'pdf-1679849493977.pdf');
INSERT INTO public.books VALUES (26, 'The Divine Comedy', 'The Divine Comedy is an Italian narrative poem by Dante Alighieri, begun c. 1308 and completed around 1321, shortly before the author''s death. It is widely considered the pre-eminent work in Italian literature and one of the greatest works of world literature.', 1856, 'cover-1679849974705.jpg', 'pdf-1679849974701.pdf');
INSERT INTO public.books VALUES (27, 'Molloy, Malone Dies, The Unnamable, the trilogy', '
Molloy is a novel by Samuel Beckett first written in French and published by Paris-based Les Éditions de Minuit in 1951. The English translation, published in 1955, is by Beckett and Patrick Bowles.', 512, 'cover-1679850029262.jpg', 'pdf-1679850029260.pdf');
INSERT INTO public.books VALUES (28, 'Ficciones', 'Ficciones is a collection of short stories by Argentine writer and poet Jorge Luis Borges, originally written and published in Spanish between 1941 and 1956. Thirteen stories from Ficciones were first published by New Directions in the English-language anthology Labyrinths.', 448, 'cover-1679850423162.jpg', 'pdf-1679850423157.pdf');
INSERT INTO public.books VALUES (29, 'Jacques the Fatalist', 'Jacques the Fatalist and his Master is a novel by Denis Diderot, written during the period 1765–1780.', 1200, 'cover-1679850474111.jpg', 'pdf-1679850474103.pdf');
INSERT INTO public.books VALUES (30, 'Faust', 'Faust is the protagonist of a classic German legend based on the historical Johann Georg Faust. The erudite Faust is highly successful yet dissatisfied with his life, which leads him to make a pact with the Devil at a crossroads, exchanging his soul for unlimited knowledge and worldly pleasures.', 320, 'cover-1679850541992.jpg', 'pdf-1679850541989.pdf');
INSERT INTO public.books VALUES (31, 'Season of Migration to the North', 'Season of Migration to the North is a classic postcolonial Arabic novel by the Sudanese novelist Tayeb Salih, published in 1966; it is the novel for which he is best known. It was first published in the Beirut journal Hiwâr.', 278, 'cover-1679850683237.jpg', 'pdf-1679850683236.pdf');
INSERT INTO public.books VALUES (32, 'Hamlet', 'The Tragedy of Hamlet, Prince of Denmark, often shortened to Hamlet, is a tragedy written by William Shakespeare sometime between 1599 and 1601. It is Shakespeare''s longest play, with 29,551 words.', 864, 'cover-1679851114523.jpg', 'pdf-1679851114521.pdf');
INSERT INTO public.books VALUES (33, 'King Lear', 'King Lear is a tragedy written by William Shakespeare. It is based on the mythological Leir of Britain. King Lear, in preparation for his old age, divides his power and land between two of his daughters. He becomes destitute and insane and a proscribed crux of political machinations.', 768, 'cover-1679851611606.jpg', 'pdf-1679851611601.pdf');
INSERT INTO public.books VALUES (34, 'Oedipus the King', 'Oedipus Rex, also known by its Greek title, Oedipus Tyrannus, or Oedipus the King, is an Athenian tragedy by Sophocles that was first performed around 429 BC. Originally, to the ancient Greeks, the title was simply Oedipus, as it is referred to by Aristotle in the Poetics.', 176, 'cover-1679851676314.jpg', 'pdf-1679851676311.pdf');
INSERT INTO public.books VALUES (35, 'The Stranger', 'The Stranger, also published in English as The Outsider, is a 1942 novella written by French author Albert Camus. The first of Camus'' novels published in his lifetime, the story follows Meursault, an indifferent settler in French Algeria, who, weeks after his mother''s funeral, kills an unnamed Arab ', 370, 'cover-1679908287632.jpg', 'pdf-1679908287617.pdf');


--
-- Data for Name: books_authors; Type: TABLE DATA; Schema: public; Owner: aakashmangla
--

INSERT INTO public.books_authors VALUES (25, 30);
INSERT INTO public.books_authors VALUES (26, 31);
INSERT INTO public.books_authors VALUES (27, 32);
INSERT INTO public.books_authors VALUES (28, 33);
INSERT INTO public.books_authors VALUES (29, 34);
INSERT INTO public.books_authors VALUES (30, 35);
INSERT INTO public.books_authors VALUES (31, 36);
INSERT INTO public.books_authors VALUES (32, 37);
INSERT INTO public.books_authors VALUES (34, 39);
INSERT INTO public.books_authors VALUES (33, 37);
INSERT INTO public.books_authors VALUES (25, 31);
INSERT INTO public.books_authors VALUES (35, 40);


--
-- Name: authors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aakashmangla
--

SELECT pg_catalog.setval('public.authors_id_seq', 40, true);


--
-- Name: books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aakashmangla
--

SELECT pg_catalog.setval('public.books_id_seq', 35, true);


--
-- Name: authors authors_pkey; Type: CONSTRAINT; Schema: public; Owner: aakashmangla
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (id);


--
-- Name: books_authors books_authors_pkey; Type: CONSTRAINT; Schema: public; Owner: aakashmangla
--

ALTER TABLE ONLY public.books_authors
    ADD CONSTRAINT books_authors_pkey PRIMARY KEY (book_id, author_id);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: aakashmangla
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- Name: books_authors fk_author; Type: FK CONSTRAINT; Schema: public; Owner: aakashmangla
--

ALTER TABLE ONLY public.books_authors
    ADD CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES public.authors(id);


--
-- Name: books_authors fk_book; Type: FK CONSTRAINT; Schema: public; Owner: aakashmangla
--

ALTER TABLE ONLY public.books_authors
    ADD CONSTRAINT fk_book FOREIGN KEY (book_id) REFERENCES public.books(id);


--
-- PostgreSQL database dump complete
--

