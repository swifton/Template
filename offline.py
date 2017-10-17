import tornado.websocket
import os.path

update_rate = 60


class Application(tornado.web.Application):
    def __init__(self):
        handlers = [(r"/", MainHandler),
                    (r"/images/(.*)", tornado.web.StaticFileHandler, {'path': './images/'}),
                    (r"/lib/(.*)", tornado.web.StaticFileHandler, {'path':  "../template/js"})
                    ]

        settings = dict(
            cookie_secret="IguyZ4KsTOOL0igwXWHJPnTQaZgULkmNom4uO6xXxrE",
            template_path=os.path.join(os.path.dirname(__file__), "templates"),
            static_path=os.path.join(os.path.dirname(__file__), "static"),
            xsrf_cookies=True,
        )

        super(Application, self).__init__(handlers, **settings)


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")

if __name__ == "__main__":
    app = Application()
    app.listen(80)
    loop = tornado.ioloop.IOLoop.current()
    loop.start()
