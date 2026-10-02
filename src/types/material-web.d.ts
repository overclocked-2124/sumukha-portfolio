declare namespace React {
  namespace JSX {
    interface IntrinsicElements {
      "md-elevation": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "md-ripple": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "md-filled-button": React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLElement>, HTMLElement>;
      "md-outlined-button": React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLElement>, HTMLElement>;
      "md-text-button": React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLElement>, HTMLElement>;
      "md-chip-set": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "md-filter-chip": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { label?: string; selected?: boolean }, HTMLElement>;
      "md-assist-chip": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { label?: string; href?: string }, HTMLElement>;
      "md-icon": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "md-divider": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "md-linear-progress": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { value?: number; max?: number; indeterminate?: boolean }, HTMLElement>;
    }
  }
}
