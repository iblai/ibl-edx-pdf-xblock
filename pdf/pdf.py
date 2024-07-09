"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources

#from xblock.fragment import Fragment
from web_fragments.fragment import Fragment
from xblock.core import XBlock
from xblock.fields import Integer, Scope, String


class pdfXBlock(XBlock):
    """
    TO-DO: document what your XBlock does.
    """
    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.
    # TO-DO: change the default href so it is included as a resource in the xblock, not an url
    href = String(display_name="href",
                  default="http://www.upv.es/plano/directorio-es.pdf",
                  scope=Scope.content,
                  help="PDF file that will be shown in the XBlock")

    display_name = String(display_name="Display Name",
                          default="PDF File",
                          scope=Scope.settings,
                          help="Name of the component in the edxplatform")

    # def resource_string(self, path):
    #     """Handy helper for getting resources from our kit."""
    #     data = pkg_resources.resource_string(__name__, path)
    #     return data.decode("utf8")

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        if isinstance(data, bytes):
            return data.decode("utf8")
        return data


    #def student_view(self, context=None):
        """
        The primary view of the pdfXBlock, shown to students
        when viewing courses.
        """
    #    html = self.resource_string("static/html/pdf.html")
    #    frag = Fragment(html.format(self=self))
    #    frag.add_css(self.resource_string("static/css/pdf.css"))
    #    return frag

    def student_view(self, context=None):
        """
        The primary view of the pdfXBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/pdf.html")
        # Replace custom placeholder with actual href value
        html = html.replace("{href}", self.href)
        frag = Fragment(html)
        frag.add_css(self.resource_string("static/css/pdf.css"))
        frag.add_javascript(self.resource_string("static/js/src/pdf_view.js"))
        frag.initialize_js('pdfXBlock', {"href": self.href})  # Pass href to JavaScript
        return frag

    # def studio_view(self, context=None):
    #     """
    #     The primary view of the pdfXBlock, shown to students
    #     when viewing courses.
    #     """
    #     html = self.resource_string("static/html/pdf.html")
    #     # Replace custom placeholder with actual href value
    #     html = html.replace("{href}", self.href)
    #     frag = Fragment(html)
    #     frag.add_css(self.resource_string("static/css/pdf.css"))
    #     html = self.resource_string("static/html/pdf_edit.html")
    #     # frag.add_javascript(self.resource_string("static/js/src/pdf_view.js"))
    #     frag.add_javascript(self.resource_string("static/js/src/pdf_edit.js"))
    #     frag.initialize_js('pdfXBlock', {"href": self.href})  # Pass href to JavaScript
    #     return frag


    # def studio_view(self, context=None):
    #     """
    #     The primary view of the paellaXBlock, shown to students
    #     when viewing courses.
    #     """
    #     html = html.replace("{href}", self.href)
    #     html = self.resource_string("static/html/pdf_edit.html")
    #     frag = Fragment(html.format(self=self))
    #     frag.add_javascript(self.resource_string("static/js/src/pdf_edit.js"))
    #     frag.initialize_js('pdfXBlock', {"href": self.href})
    #     return frag

    def studio_view(self, context=None):
        """
        The primary view of the PDF XBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/pdf_edit.html")
        frag = Fragment(html.format(href=self.href))  # Pass href as a named argument
        frag.add_javascript(self.resource_string("static/js/src/pdf_edit.js"))
        frag.initialize_js('pdfXBlock')
        return frag

    @XBlock.json_handler
    def save_pdf(self, data, suffix=''):
        """
        An example handler, which increments the data.
        """
        self.href = data['href']
        self.display_name = data['display_name']

        return {
            'result': 'success',
        }

    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("pdfXBlock",
             """<vertical_demo>
                <pdf/>
                </vertical_demo>
             """),
        ]
