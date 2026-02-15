/**
 * STEP 23: Resume Window - PDF Display
 * ======================================
 * Displays resume as an embedded PDF document:
 * - Uses react-pdf library for PDF rendering
 * - Shows first page of resume file
 * - Includes download button in window header
 * - Handles text layer and annotation layer styling
 */

import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { Download } from "lucide-react";

// STEP 25: Setup react-pdf with Web Worker
// Initializes PDF.js worker for parsing and rendering PDF documents
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const Resume = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="resume" />

        <h2>Resume.pdf</h2>
        <a
          href="files/resume.pdf"
          download
          className="cursor-pointer"
          title="Download resume"
        >
          <Download className="icon" />
        </a>
      </div>

      {/* STEP 25 (continued): Render PDF Document Component */}
      <Document file="files/resume.pdf">
        <Page pageNumber={1} renderTextLayer renderAnnotationLayer />
      </Document>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;
