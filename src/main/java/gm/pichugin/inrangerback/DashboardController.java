package gm.pichugin.inrangerback;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.TimeZone;

@Controller
public class DashboardController {

    @Value("${spring.application.name}")
    private String appName;

    private final GlucoseService glucoseService;

    public DashboardController(GlucoseService glucoseService) {
        this.glucoseService = glucoseService;
    }

    @GetMapping("/")
    public String homePage(Model model, TimeZone timezone) {
        model
                .addAttribute("appName", appName)
                .addAttribute("todayRecords", glucoseService.getToday(timezone))
                .addAttribute("yesterdayRecords", glucoseService.getYesterday(timezone));

        return "index";
    }
}
