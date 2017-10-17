import tornado.websocket
import os.path

players = []

update_rate = 60


class Application(tornado.web.Application):
    def __init__(self):
        handlers = [(r"/", MainHandler), 
					(r"/socket", SocketHandler), 
					(r"/lib/(.*)", tornado.web.StaticFileHandler, {'path':  "../template/js"})]

        settings = dict(
            cookie_secret="IguyZ4KsTOOL0igwXWHJPnTQaZgULkmNom4uO6xXxrE",
            template_path=os.path.join(os.path.dirname(__file__), "templates"),
            static_path=os.path.join(os.path.dirname(__file__), "static"),
            xsrf_cookies=True,
            debug=True  # TODO: make it impossible to forget to change this in production
        )

        super(Application, self).__init__(handlers, **settings)


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")


class SocketHandler(tornado.websocket.WebSocketHandler):
    def open(self):
        players.append(self)
        # handle new player

    def on_close(self):
        player_index = game.players.index(self)
        players.remove(self)
        # handle unplugged player

    def on_message(self, message):
        player_index = players.index(self)
        # handle the message


if __name__ == "__main__":
    app = Application()
    app.listen(80)
    loop = tornado.ioloop.IOLoop.current()
    tornado.ioloop.PeriodicCallback(game.game_loop, 1000 / update_rate).start()
    loop.start()
