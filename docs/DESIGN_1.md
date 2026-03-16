# Design System: 16-firebase-file-uploader

## Visual Philosophy
The design follows a **Technical Cloud Infrastructure / Asset Hub** aesthetic. It uses a clean white and slate foundation with "Cloud Blue" (Blue-600) as the primary action color, focusing on information density and high-fidelity interaction feedback.

## Design Patterns
-   **Cloud Cards**: Rounded container blocks (2.5rem - 3rem radii) with subtle drop shadows for high-end spatial organization.
-   **Uploader Zones**: Dashed interactive boundaries with scale-focus effects for tactile drag-and-drop simulation.
-   **Identity Icons**: Distinct color-coding for file types (Rose for PDF, Emerald for Image, Amber for Audio) to facilitate rapid visual scanning.
-   **Technical Banners**: High-contrast "Sentinel" sections for security and status reporting.

## Color Palette
-   **Hub Canvas**: Slate-50 (#f8fafc)
-   **Technical Primary**: Blue-600 (#2563eb)
-   **Deep Context**: Slate-900 (#0f172a)
-   **Status Muted**: Slate-400 (#94a3b8)

## Interaction Design
-   **Upload Orchestration**: Transitioning between "Idle", "Syncing", and "Success" states with fluid AnimatePresence motion.
-   **Copy Feedback**: Immediate icon switching with spring-loaded reset for URL sharing.
-   **Active States**: High-performance hover scaling (110%) on file icons and 95% scaling on primary buttons for a premium "clickable" feel.
