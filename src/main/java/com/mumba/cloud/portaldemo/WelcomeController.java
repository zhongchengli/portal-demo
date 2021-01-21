package com.mumba.cloud.portaldemo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import rx.Observable;
import ws.wamp.jawampa.WampClient;
import ws.wamp.jawampa.WampClientBuilder;
import ws.wamp.jawampa.WampRouter;
import ws.wamp.jawampa.WampRouterBuilder;
import ws.wamp.jawampa.connection.IWampConnectorProvider;
import ws.wamp.jawampa.transport.netty.NettyWampClientConnectorProvider;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * @author Jason Li     3/11/2017 10:50 PM
 * @copyright 2017 Mumba Pty Ltd. All rights reserved.
 */
@Controller
public class WelcomeController {
    // inject via application.properties
    @Value("${welcome.message:test}")
    private String message = "Hello World";

    @RequestMapping("/")
    public String welcome(Map<String, Object> model) {
        model.put("message", this.message);
        return "welcome";
    }

    @RequestMapping(value = {"/home"}, method = RequestMethod.GET)
    public String gotoHome(){
        return "home";
    }

    @RequestMapping("/keyCloakLogout")
    public String logout(HttpServletRequest request, Map<String, Object> model) throws ServletException {
        request.logout();
        return welcome(model);
    }

    @RequestMapping(value = {"/codepushing"}, method = RequestMethod.GET)
    public String codePush(HttpServletRequest request, Map<String, Object> model) throws ServletException {
        return "www/index";
    }



//    @RequestMapping(value = {"/wamp"})
//    public String testWamp(){
//        testCalling();
//        return "home";
//    }


//    public void testCalling(){
//        WampClient client = this.buildClient();
//        Observable<Long> result1 = client.call("mumba.users.get", Long.class, 33, 66);
//    }


//    private WampRouter buildRouter() {
//        WampRouterBuilder routerBuilder = new WampRouterBuilder();
//        try {
//            routerBuilder.addRealm("realm1");
//            return routerBuilder.build();
//        } catch (Exception ex) {
//            ex.printStackTrace();
//        }
//        return null;
//    }
//
//    private WampClient buildClient() {
//        IWampConnectorProvider connectorProvider = new NettyWampClientConnectorProvider();
//        System.out.println("########################");
//        WampClientBuilder builder = new WampClientBuilder();
//        System.out.println("%%%%%%%%%%%%%%%%%%%%%%%%%");
//        final WampClient client;
//        try {
//            builder.withConnectorProvider(connectorProvider)
//                    .withUri("ws://iss-dev.mumba.cloud/ws")
//                    .withRealm("realm1")
//                    .withInfiniteReconnects()
//                    .withReconnectInterval(3, TimeUnit.SECONDS);
//            System.out.println("^^^^^^^^^^^^^^^^^^^^^^^^^");
//            client = builder.build();
//            return client;
//        } catch (Exception ex) {
//            ex.printStackTrace();
//        }
//        return null;
//    }
}
